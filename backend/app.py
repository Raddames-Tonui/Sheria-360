from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import MetaData
from functools import wraps
from models import db, User  # Ensure you have a User model defined in models.py
from flask_cors import CORS
from firebase import verify_token  # Import your verify_token function

# Initialize the Flask application
app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Update as needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database and migration
db.init_app(app)
migrate = Migrate(app, db)

# Enable CORS for all routes
CORS(app)

def firebase_auth_required(f):
    """Decorator to protect routes with Firebase authentication."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Authorization header is missing'}), 401

        uid = verify_token(token)  # Use the verify_token function from firebase.py
        if uid is None:
            return jsonify({'error': 'Invalid token'}), 401

        return f(uid, *args, **kwargs)

    return decorated_function

# ========================================= USER ==========================================

# Register User
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    try:
        # Ensure both email and firebase_uid are provided
        if 'email' not in data or 'firebase_uid' not in data:
            return jsonify({'error': 'Email and firebase_uid are required.'}), 400

        # Create a new user entry in your database
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

# Update User details
@app.route('/api/lawyer/update', methods=['PUT'])
@firebase_auth_required
def update_lawyer(uid):
    data = request.json
    try:
        # Find the user by Firebase UID
        user = User.query.filter_by(firebase_uid=uid).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Update the user's lawyer details
        user.first_name = data.get('firstName', user.first_name)
        user.last_name = data.get('lastName', user.last_name)
        user.work_email = data.get('workEmail', user.work_email)  
        user.phone = data.get('phone', user.phone)
        user.expertise = data.get('expertise', user.expertise)
        user.experience = data.get('experience', user.experience)
        user.bio = data.get('bio', user.bio)
        user.location = data.get('location', user.location)
        user.law_firm = data.get('law_firm', user.law_firm)

        db.session.commit()

        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Fetch user details 
@app.route('/api/lawyer/details', methods=['GET'])
@firebase_auth_required
def get_lawyer_details(uid):
    """Fetch the lawyer's details using their Firebase UID."""
    try:
        user = User.query.filter_by(firebase_uid=uid).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        return jsonify(user.to_dict()), 200 
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/')
def index():
    return 'Welcome to the Sheria 360 API!'

if __name__ == '__main__':
    app.run(debug=True, port=5555)
