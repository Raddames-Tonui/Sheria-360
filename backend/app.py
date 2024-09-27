from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from functools import wraps
from firebase import verify_token  # Import the verify_token function
from models import db, User  # Import your User model
from flask_cors import CORS  # Import CORS

# Define metadata naming conventions
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

app = Flask(__name__)

# Initialize your database and other configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Enable CORS for all routes
CORS(app)

@app.route('/')
def index():
    return 'Welcome to the Sheria 360 API!'

def firebase_auth_required(f):
    """Decorator to protect routes with Firebase authentication."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Authorization header is missing'}), 401

        uid = verify_token(token)
        if uid is None:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(uid, *args, **kwargs)

    return decorated_function

@app.route('/api/protected', methods=['GET'])
@firebase_auth_required
def protected_route(uid):
    return jsonify({'message': f'Hello, user {uid}! This is a protected route.'})

@app.route('/api/lawyer', methods=['POST'])
@firebase_auth_required
def create_lawyer(uid):
    data = request.json
    try:
        # Create a new lawyer instance with the uid
        new_lawyer = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            phone=data['phone'],
            expertise=data['expertise'],
            experience=data['experience'],
            bio=data['bio'],
            location=data['location'],
            firebase_uid=uid  # Store the Firebase UID
        )
        db.session.add(new_lawyer)
        db.session.commit()
        
        return jsonify(new_lawyer.to_dict()), 201  
    except Exception as e:
        return jsonify({'error': str(e)}), 500  

# Add your other routes here
# ...

if __name__ == '__main__':
    app.run(debug=True, port=5555)
