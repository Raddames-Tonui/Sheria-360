from flask import Blueprint, request, jsonify
import firebase_admin
from firebase_admin import auth  # Assuming you have Firebase Admin SDK initialized

file_download_bp = Blueprint('file_download_bp', __name__)

@file_download_bp.route('/file/download', methods=['GET'])
def download_file():
    file_url = request.args.get('file_url')
    auth_header = request.headers.get('Authorization')

    if not file_url:
        return jsonify({"error": "File URL is required"}), 400

    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header is missing"}), 401

    # Extract the token
    token = auth_header.split(" ")[1]

    try:
        # Verify the token
        decoded_token = auth.verify_id_token(token)  # This verifies the token
        print(f"Token verified for user: {decoded_token['uid']}")  # Log for debugging
        
        # Redirect or download logic
        return redirect(file_url)  # Or implement download logic here

    except Exception as e:
        return jsonify({"error": str(e)}), 500
