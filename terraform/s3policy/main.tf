resource "aws_cloudfront_response_headers_policy" "cors_with_preflight_security_custom" {
  name = "CORS-With-Preflight-And-SecurityHeaders-Custom"

  # -----------------------
  # CORS (matches AWS managed)
  # -----------------------
    cors_config {
      access_control_allow_credentials = false
      access_control_max_age_sec      = 600
      origin_override                 = true

      access_control_allow_origins {
        items = ["*"]
      }
      access_control_allow_headers {
        items = ["*"]
      }
      access_control_allow_methods {
        items = [
          "GET",
          "POST",
          "PUT",
          "PATCH",
          "DELETE",
          "HEAD",
          "OPTIONS"
        ]
      }
      access_control_expose_headers {
        items = []
      }
    }

  # -----------------------
  # Security headers (matches AWS managed)
  # -----------------------
  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = false
      override                   = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "SAMEORIGIN"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    content_security_policy {
      content_security_policy = "default-src 'self'; img-src 'self' https://www.bitovi.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
      override                = true
    }
  }

  # -----------------------
  # Custom Header
  # -----------------------
  custom_headers_config {
    items {
      header   = "Cache-Control"
      value    = "public, max-age=31536000, immutable"
      override = true
    }
  }
}

output "policy_id" {
  description = "The ID of the CloudFront response headers policy"
  value       = aws_cloudfront_response_headers_policy.cors_with_preflight_security_custom.id
}