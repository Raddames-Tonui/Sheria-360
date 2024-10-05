from flask import Blueprint, request, jsonify, redirect
import firebase_admin
from firebase_admin import auth  # Assuming you have Firebase Admin SDK initialized
from models import db, FileUpload 

file_download_bp = Blueprint('file_download_bp', __name__)

@file_download_bp.route('/file/download/<int:file_id>', methods=['GET'])
def download_file(file_id):
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header is missing"}), 401

    # Extract the token
    token = auth_header.split(" ")[1]

    try:
        # Verify the token
        decoded_token = auth.verify_id_token(token)  # This verifies the token
        print(f"Token verified for user: {decoded_token['uid']}")  # Log for debugging

        # Fetch the file record from the database
        file_record = FileUpload.query.get(file_id)

        if file_record:
            # Redirect to the file URL for download
            return redirect(file_record.file_url)  # Redirect to the file URL
        else:
            return jsonify({"error": "File not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
