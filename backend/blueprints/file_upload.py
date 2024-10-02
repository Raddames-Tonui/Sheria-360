from flask import Blueprint, request, jsonify
from models import FileUpload, db  
from firebase import verify_token, firebase_auth_required 

# Define the Blueprint for file uploads
file_upload_bp = Blueprint('file_upload_bp', __name__)

# Route for handling the file upload
@file_upload_bp.route('/upload', methods=['POST'])
@firebase_auth_required 
def upload_file_url(uid):  # Receive uid from the decorator
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON body'}), 400
    
    # Extract file details from the JSON
    file_name = data.get('name')
    file_url = data.get('url')
    category = data.get('category')  
    parent_category = data.get('parentCategory')

    # Validate that all fields are present
    if not all([file_name, file_url, category, parent_category]):
        return jsonify({"error": "Missing required file details"}), 400

    # Create a new file upload entry
    new_file_upload = FileUpload(
        file_name=file_name,
        file_url=file_url,
        firebase_uid=uid,  # Use the UID extracted from the token
        category=category,
        parent_category=parent_category 
    )

    # Add to the session and commit to save in the database
    try:
        db.session.add(new_file_upload)
        db.session.commit()
        return jsonify({"message": "File URL and category saved successfully!"}), 200
    except Exception as e:
        db.session.rollback()  
        return jsonify({"error": "Failed to save file upload"}), 500
