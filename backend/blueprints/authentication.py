from flask import Blueprint, request, jsonify
from models import User, db

# Create a new blueprint
authentication_bp = Blueprint('authentication', __name__)

# Register User
@authentication_bp.route('/register', methods=['POST'])
def register_user():
    data = request.json
    
    try:
        # Ensure both email and firebase_uid are provided
        if 'email' not in data or 'firebase_uid' not in data:
            return jsonify({'error': 'Email and firebase_uid are required.'}), 400

        # Create a new user entry in your database if they don't exist
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'message': 'User already exists!'}), 400

        new_user = User(
            email=data['email'],
            firebase_uid=data['firebase_uid']  # Use the UID from the request
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully!'}), 201
    except Exception as e:
        print(f"Error during user registration: {str(e)}")  # Log the error for debugging
        return jsonify({'error': str(e)}), 500
