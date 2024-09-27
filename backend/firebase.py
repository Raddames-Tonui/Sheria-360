import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin SDK
cred = credentials.Certificate("config/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def verify_token(token):
    """Verify the provided Firebase token and return the user ID."""
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token['uid']  # Return the user ID from the decoded token
    except Exception as e:
        print(f"Token verification failed: {e}")
        return None
