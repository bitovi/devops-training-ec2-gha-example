#!/usr/bin/env bash

set -e


MFE_SHELL_URL="http://localhost:3000"
MFE_PROFILE_URL="http://localhost:3003"
MFE_ORDER_URL="http://localhost:3002"
MFE_MARKETING_URL="http://localhost:3004"
MFE_CATALOG_URL="http://localhost:3001"
MFE_WORKSHOP_URL="http://localhost:8080"

SENTRY_DSN_SHELL="FAKE_DSN_SHELL"
SENTRY_DSN_MARKETING="FAKE_DSN_MARKETING"
SENTRY_DSN_CATALOG="FAKE_DSN_CATALOG"
SENTRY_DSN_ORDER="FAKE_DSN_ORDER"
SENTRY_DSN_PROFILE="FAKE_DSN_PROFILE"
SENTRY_DSN_WORKSHOP="FAKE_DSN_WORKSHOP"

# ============================================================
# Create .env for "shell"
# ============================================================
cd ./packages/shell

touch .env
echo "MFE_URL_CATALOG=$MFE_CATALOG_URL" > .env
echo "MFE_URL_MARKETING=$MFE_MARKETING_URL" >> .env
echo "MFE_URL_ORDER=$MFE_ORDER_URL" >> .env
echo "MFE_URL_PROFILE=$MFE_PROFILE_URL" >> .env
echo "MFE_URL_WORKSHOP=$MFE_WORKSHOP_URL" >> .env
echo "SENTRY_DSN_SHELL=$SENTRY_DSN_SHELL" >> .env


# ============================================================
# Create .env for "marketing" 
# ============================================================
cd ../marketing

touch .env
echo "MFE_URL_CATALOG=$MFE_CATALOG_URL" > .env
echo "MFE_URL_ORDER=$MFE_ORDER_URL" >> .env
echo "SENTRY_DSN_MARKETING=$SENTRY_DSN_MARKETING" >> .env

# ============================================================
# Create .env for "catalog" 
# ============================================================
cd ../catalog

touch .env
echo "SENTRY_DSN_CATALOG=$SENTRY_DSN_CATALOG" > .env

# ============================================================
# Create .env for "order" 
# ============================================================
cd ../order

touch .env
echo "SENTRY_DSN_ORDER=$SENTRY_DSN_ORDER" > .env

# ============================================================
# Create .env for "profile" 
# ============================================================
cd ../profile

touch .env
echo "SENTRY_DSN_PROFILE=$SENTRY_DSN_PROFILE" > .env

# ============================================================
# Create .env for "workshop" 
# ============================================================
cd ../workshop

touch .env
echo "SENTRY_DSN_WORKSHOP=$SENTRY_DSN_WORKSHOP" > .env

cd ../../..

echo "Local .env setup complete!"
