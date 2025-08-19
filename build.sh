#!/bin/bash

DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)
  IMAGE_TAG=auth
  ORG_NAME=bitovi
  
  BRANCH_OR_TAG_NAME=${GITHUB_REF##*/}
  echo "BRANCH_OR_TAG_NAME: $BRANCH_OR_TAG_NAME"
  
  if [ -z "$IMAGE_TAG" ]; then
    if [[ false == 'true' ]]; then
      IMAGE_TAG="$GITHUB_SHA"
    elif [ "$BRANCH_OR_TAG_NAME" == "$DEFAULT_BRANCH" ] && [ true == 'true'  ] ; then
      IMAGE_TAG="latest"
    elif [ "$GITHUB_EVENT_NAME" == "pull_request" ]; then
      IMAGE_TAG="pr-${GITHUB_HEAD_REF}"
    else
      IMAGE_TAG="$BRANCH_OR_TAG_NAME"
    fi
  fi
  echo "Image_Tag: $IMAGE_TAG"
  
#  if [ -z "" ] ; then
#    ORG_NAME=$(echo $GITHUB_REPOSITORY | sed 's/\/.*//')
#  else
#    ORG_NAME="bitovi"
#  fi
 
  
   if [ -z "testing-repo-leo" ] ; then
    AWS_ECR_REPO_NAME=$(echo $GITHUB_REPOSITORY | sed 's/^.*\///')
  else
    AWS_ECR_REPO_NAME="testing-repo-leo"
  fi
  
  IMAGE_NAME="$ORG_NAME/$AWS_ECR_REPO_NAME"
  
  if [ -n "" ]; then
    cd 
  fi
  
  echo "::group::Build Image"
  echo "Building $IMAGE_NAME"
  echo "docker build --pull -t $IMAGE_NAME:$IMAGE_TAG -t 755521597925.dkr.ecr.us-east-1.amazonaws.com/testing-repo-leo:$IMAGE_TAG . "
  echo "::endgroup::"
