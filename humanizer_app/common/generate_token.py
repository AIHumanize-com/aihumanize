from django.core.signing import TimestampSigner
from datetime import timedelta
import jwt
from datetime import datetime
from django.conf import settings

def generate_secure_token_with_expiry(data, expiry_days=1):
    payload = {
        "exp": datetime.utcnow() + timedelta(days=1),  # 1 day expiration
        "some": "authority",
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
