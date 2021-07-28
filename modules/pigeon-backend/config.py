import os

# CORS through summ-web
CORS_ALLOW_ORIGINS = os.environ.get("CORS_ALLOW_ORIGINS", "").split(",")

# Stripe API Key
SLACK_SIGNING_SECRET = os.environ["SLACK_SIGNING_SECRET"]
SLACK_BOT_TOKEN = os.environ["SLACK_BOT_TOKEN"]

# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = os.environ["SQLALCHEMY_DATABASE_URI"]

# JWT Auth
SECRET_KEY = os.environ.get("SECRET_KEY")
JWT_LIFESPAN = os.environ.get("JWT_LIFESPAN", -1)
JWT_FRESHSPAN = os.environ.get("JWT_FRESHSPAN", 5)

# Logging
tmp = os.environ.get("SUMM_LOG_FILE")
if tmp:
    SUMM_LOG_FILE = tmp

tmp = os.environ.get("SUMM_LOG_FILE_SIZE")
if tmp:
    SUMM_LOG_FILE_SIZE = tmp
