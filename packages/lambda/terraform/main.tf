# Variables
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket for uploaded documents"
  type        = string
  default     = "swp-uploaded-documents-bucket"
}

variable "api_endpoint" {
  description = "API endpoint for document processing"
  type        = string
  default     = "https://api2.example.com/documents"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "tf_state_bucket" {
  description = "S3 bucket for Terraform state"
  type        = string
  default     = "swp-uploaded-documents-bucket-tf-state"
}

provider "aws" {
  region = "var.aws_region"
}

terraform {
  backend "s3" {
    bucket  = "${TF_STATE_BUCKET}"
    region  = "${AWS_REGION}"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }
  required_version = ">= 1.2"
}

# S3 Bucket with EventBridge events enabled
resource "aws_s3_bucket" "uploaded_documents" {
  bucket = var.bucket_name
  tags = {
    swp-cayman  = "true"
    category    = "documents"
    environment = var.environment
  }
}

# Enable EventBridge notifications on the bucket
resource "aws_s3_bucket_notification" "enable_eventbridge" {
  bucket      = aws_s3_bucket.uploaded_documents.id
  eventbridge = true

  depends_on = [aws_s3_bucket.uploaded_documents]
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "uploaded-documents-bucket-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Principal = { Service = "lambda.amazonaws.com" },
      Effect    = "Allow"
    }]
  })

  tags = {
    swp-cayman  = "true"
    category    = "documents"
    environment = var.environment
  }
}

# Basic logging + S3 read
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "s3_read" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}

# CloudWatch Log Group for Lambda
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/uploaded-documents-bucket-document-created"
  retention_in_days = 14

  tags = {
    swp-cayman  = "true"
    category    = "documents"
    environment = var.environment
  }
}

# Create Lambda deployment package
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/../code/index.js"
  output_path = "${path.module}/lambda.zip"
}

# Lambda Function
resource "aws_lambda_function" "bucket_document_created" {
  function_name = "uploaded-documents-bucket-document-created"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  depends_on = [
    aws_iam_role_policy_attachment.lambda_basic,
    aws_cloudwatch_log_group.lambda_logs,
  ]

  tags = {
    swp-cayman  = "true"
    category    = "documents"
    environment = var.environment
  }

  environment {
    variables = {
      API_ENDPOINT = var.api_endpoint
    }
  }
}

# EventBridge Rule (default bus)
resource "aws_cloudwatch_event_rule" "object_created" {
  name           = "uploaded-documents-bucket-object-created"
  description    = "Trigger when object is created in uploaded-documents-bucket bucket"
  event_bus_name = "default"

  event_pattern = jsonencode({
    "source" : ["aws.s3"],
    "detail-type" : ["Object Created"],
    "detail" : {
      "bucket" : {
        "name" : ["${aws_s3_bucket.uploaded_documents.bucket}"]
      }
    }
  })

  tags = {
    swp-cayman  = "true"
    category    = "documents"
    environment = var.environment
  }
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.object_created.name
  target_id = "uploaded-documents-lambda-target"
  arn       = aws_lambda_function.bucket_document_created.arn
}

# Permission for EventBridge to invoke Lambda
resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.bucket_document_created.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.object_created.arn
}

# Outputs
output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.uploaded_documents.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.uploaded_documents.arn
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.bucket_document_created.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.bucket_document_created.arn
}

output "eventbridge_rule_name" {
  description = "Name of the EventBridge rule"
  value       = aws_cloudwatch_event_rule.object_created.name
}

output "cloudwatch_log_group_name" {
  description = "Name of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.lambda_logs.name
}

