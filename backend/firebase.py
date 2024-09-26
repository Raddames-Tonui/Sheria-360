import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate('config/serviceAccountKey.json') 
firebase_admin.initialize_app(cred)


def verify_token(token):
    """Verify the Firebase token and return the user's UID."""
    try:
        decoded_token =auth.verify_id_token(token)
        return decoded_token['uid']
    except Exception:
        return None
