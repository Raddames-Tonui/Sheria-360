import os
import firebase_admin
from firebase_admin import credentials, auth
from functools import wraps
from flask import request, jsonify
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase Admin SDK using credentials from environment variables
cred = credentials.Certificate({
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),  # Handle newlines correctly
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
    "universe_domain": os.getenv("FIREBASE_UNIVERSE_DOMAIN")
})

# Check if an app is already initialized to avoid ValueError
if not firebase_admin._apps:  # Ensure the app is only initialized once
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'gs://sheria-365.appspot.com'  # Set your storage bucket
    })

# VERIFY TOKENS IN PROTECTED ROUTES
def verify_token(token):
    """Verify the provided Firebase token and return the user ID."""
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token['uid']  # Return the user ID from the decoded token
    except Exception as e:
        print(f"Token verification failed: {e}")
        return None

# FOR WRAPPING PROTECTED ROUTES
def firebase_auth_required(f):
    """Decorator to protect routes with Firebase authentication."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Authorization header is missing'}), 401

        # Extract the token from the 'Bearer' prefix
        token = token.split("Bearer ")[-1]
        
        uid = verify_token(token)  # Use the verify_token function from firebase.py
        if uid is None:
            return jsonify({'error': 'Invalid token'}), 401

        return f(uid, *args, **kwargs)

    return decorated_function
