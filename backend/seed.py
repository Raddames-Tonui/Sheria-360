from models import db, User
from app import app

# Sample data for the User table
users = [
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "expertise": "Corporate Law",
        "experience": 10,
        "bio": "Experienced corporate lawyer with a decade of experience in handling complex cases.",
        "location": "New York"
    },
    {
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane.smith@example.com",
        "phone": "0987654321",
        "expertise": "Criminal Law",
        "experience": 5,
        "bio": "Passionate about justice and defending clients in criminal cases.",
        "location": "Los Angeles"
    },
    {
        "first_name": "Alice",
        "last_name": "Johnson",
        "email": "alice.johnson@example.com",
        "phone": "1122334455",
        "expertise": "Family Law",
        "experience": 8,
        "bio": "Expert in family law with extensive experience in custody and divorce cases.",
        "location": "Chicago"
    },
    {
        "first_name": "Bob",
        "last_name": "Williams",
        "email": "bob.williams@example.com",
        "phone": "5566778899",
        "expertise": "Immigration Law",
        "experience": 12,
        "bio": "Helping individuals and families navigate complex immigration processes.",
        "location": "San Francisco"
    }
]

# Seed the database with sample data
with app.app_context():
    db.create_all()  # Create tables if they don't exist
    
    # Add each user to the database session
    for user_data in users:
        user = User(
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            email=user_data['email'],
            phone=user_data['phone'],
            expertise=user_data['expertise'],
            experience=user_data['experience'],
            bio=user_data['bio'],
            location=user_data['location']
        )
        db.session.add(user)
    
    # Commit the changes to the database
    db.session.commit()
    print("Database seeded successfully!")
