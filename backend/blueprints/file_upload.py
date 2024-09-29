from flask import Blueprint, request, jsonify
from models import FileUpload, db  
from firebase import verify_token  

# Define the Blueprint for file uploads
file_upload_bp = Blueprint('file_upload_bp', __name__)

# Route for handling the file upload
@file_upload_bp.route('/upload', methods=['POST'])
def upload_file_url():
    token = request.headers.get('Authorization')
    print(token)
    if not token:
        return jsonify({'error': 'Authorization header is missing'}), 401

    # Extract the token from the 'Bearer' prefix
    try:
        token = token.split("Bearer ")[-1]
    except Exception as e:
        return jsonify({'error': 'Malformed Authorization header'}), 401

    # Verify the token and extract Firebase UID
    firebase_uid = verify_token(token)  
    if firebase_uid is None:
        return jsonify({'error': 'Invalid token'}), 401

    # Get JSON data from the request
    try:
        data = request.get_json()
        print(f"Received data: {data}")  # Log the received data
    except Exception as e:
        return jsonify({'error': 'Invalid JSON body'}), 400

    # Extract file details from the JSON
    file_name = data.get('name')
    file_url = data.get('url')
    category = data.get('category')  
    parent_category = data.get('parentCategory')

    print(file_name, file_url, category, parent_category)
    
    # Validate that all fields are present
    if not all([file_name, file_url, category, parent_category]):
        return jsonify({"error": "Missing required file details"}), 400

    # Create a new file upload entry
    new_file_upload = FileUpload(
        file_name=file_name,
        file_url=file_url,
        firebase_uid=firebase_uid,  # Use UID extracted from token
        category=category,
        parent_category=parent_category  # Save parent category
    )

    # Add to the session and commit to save in the database
    try:
        db.session.add(new_file_upload)
        db.session.commit()
        return jsonify({"message": "File URL and category saved successfully!"}), 200
    except Exception as e:
        db.session.rollback()  
        print(f"Error saving file upload: {str(e)}") 
        return jsonify({"error": "Failed to save file upload"}), 500
