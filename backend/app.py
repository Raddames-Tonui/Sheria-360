# app.py ( main Flask application)
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Case, FileUpload
from flask_cors import CORS
from firebase import verify_token  # Import only the verify_token function
from blueprints.file_upload import file_upload_bp  # Import the blueprint from the blueprints folder
from blueprints.file_download import file_download_bp
from blueprints.court_cases import court_cases_bp  
from blueprints.authentication import authentication_bp  

# Initialize the Flask application
app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database and migration
db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

@app.route('/')
def index():
    return 'Welcome to the Sheria 360 API!'

# ============================= BLUEPRINTS ================================
# Register the blueprint
app.register_blueprint(file_upload_bp, url_prefix='/file')
app.register_blueprint(file_download_bp, url_prefix='/file')
app.register_blueprint(court_cases_bp, url_prefix='/case')
app.register_blueprint(authentication_bp, url_prefix='/auth')  

# ============================= USER =======================================
# Check User if exists in login
@app.route('/check-user', methods=['POST'])
def check_user():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"exists": True, "firebase_uid": user.firebase_uid}), 200
    return jsonify({"exists": False}), 200



# Update User details
@app.route('/api/lawyer/update', methods=['PUT'])
def update_lawyer():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Authorization header is missing'}), 401

    # Extract the token from the 'Bearer' prefix
    token = token.split("Bearer ")[-1]
    
    uid = verify_token(token)  # Use the verify_token function from firebase.py
    if uid is None:
        return jsonify({'error': 'Invalid token'}), 401

    data = request.json
    try:
        user = User.query.filter_by(firebase_uid=uid).first()
        if not user:
            return jsonify({'success': False, 'error': 'User not found'}), 404

        # Update the user's lawyer details
        user.first_name = data.get('firstName', user.first_name)
        user.last_name = data.get('lastName', user.last_name)
        user.work_email = data.get('workEmail', user.work_email)  
        user.phone = data.get('phone', user.phone)
        user.expertise = data.get('expertise', user.expertise)
        user.experience = data.get('experience', user.experience)
        user.bio = data.get('bio', user.bio)
        user.location = data.get('location', user.location)
        user.law_firm = data.get('lawFirm', user.law_firm)
        user.profile_picture = data.get('profilePicture', user.profile_picture) 

        db.session.commit()

        return jsonify({'success': True, 'data': user.to_dict()}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Update User details
@app.route('/user/update', methods=['PATCH'])
def update_user():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Authorization header is missing'}), 401

    # Extract the token from the 'Bearer' prefix
    token = token.split("Bearer ")[-1]
    
    uid = verify_token(token)  # Use the verify_token function from firebase.py
    if uid is None:
        return jsonify({'error': 'Invalid token'}), 401

    data = request.json
    try:
        user = User.query.filter_by(firebase_uid=uid).first()
        if not user:
            return jsonify({'success': False, 'error': 'User not found'}), 404

        # Update the user's details
        user.first_name = data.get('firstName', user.first_name)
        user.last_name = data.get('lastName', user.last_name)
        user.phone = data.get('phone', user.phone)
        user.profile_picture = data.get('profilePicture', user.profile_picture)

        db.session.commit()

        return jsonify({'success': True, 'data': user.to_dict()}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Fetch user details 
@app.route('/api/user/details', methods=['GET'])
def get_lawyer_details():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Authorization header is missing'}), 401

    # Extract the token from the 'Bearer' prefix
    token = token.split("Bearer ")[-1]
    
    uid = verify_token(token)  # Use the verify_token function from firebase.py
    if uid is None:
        return jsonify({'error': 'Invalid token'}), 401

    """Fetch the lawyer's details using their Firebase UID."""
    try:
        user = User.query.filter_by(firebase_uid=uid).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        return jsonify(user.to_dict()), 200 
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================== SEARCH USER ==========================================

# Route to get a lawyer by ID
@app.route('/api/users/<int:id>', methods=['GET'])
def get_lawyer_by_id(id):
    try:
        # Fetch the lawyer by ID from the database
        lawyer = User.query.get(id)

        if not lawyer:
            return jsonify({"error": "Lawyer not found"}), 404

        # Return lawyer details using to_dict method
        return jsonify(lawyer.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fetch users by County Locations, Expertise, and Experience
@app.route('/api/users/by-filters', methods=['GET'])
def get_users_by_filters():
    location = request.args.get('location')  
    expertise = request.args.get('expertise')  
    experience = request.args.get('experience')
    
    query = User.query  # Start the query

    # Apply filters only if parameters are provided
    if location:
        query = query.filter_by(location=location)
    if expertise:
        query = query.filter_by(expertise=expertise)
    if experience:
        try:
            # Convert experience to integer before filtering
            experience = int(experience)
            query = query.filter_by(experience=experience)
        except ValueError:
            return jsonify({'error': 'Experience must be a number'}), 400

    users = query.all()  # Execute the query and fetch users
    
    users_list = [user.to_dict() for user in users] 
    
    return jsonify(users_list), 200 

# Search by name, location, expertise
@app.route('/api/users/search', methods=['GET'])
def search_users():
    query = request.args.get('query', '').lower() 
    location = request.args.get('location', '')  

    # Search by first name, last name, or expertise (case-insensitive)
    search_filter = User.query.filter(
        db.or_(
            db.func.lower(User.first_name).like(f"%{query}%"),
            db.func.lower(User.last_name).like(f"%{query}%"),
            db.func.lower(User.expertise).like(f"%{query}%")
        )
    )

    if location:
        search_filter = search_filter.filter_by(location=location)

    users = search_filter.all() 
    users_list = [user.to_dict() for user in users]

    return jsonify(users_list), 200

if __name__ == '__main__':
    app.run(debug=True, port=5555)
