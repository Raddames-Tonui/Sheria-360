# seed.py
from faker import Faker
from app import app, db  # Import the app and db instances
from models import User  # Import the User model

fake = Faker()

def seed_users(num_users=100):
    for _ in range(num_users):
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(), 
            work_email=fake.email(),
            law_firm=fake.company(),
            phone=fake.phone_number(),
            expertise=fake.random_element(elements=[
                "Commercial Law", "Banking & Finance", "Real Estate", 
                "Intellectual Property", "Public Law", "Constitutional Law", 
                "Environmental Law", "Administrative Law", "Private Law", 
                "Family Law", "Probate & Estate Administration", "Employment Law", 
                "Criminal Law", "Criminal Defense", "Traffic Offenses", 
                "Anti-Corruption", "Specialized Areas", "Maritime Law", 
                "Aviation Law", "Sports Law"
            ]),
            experience=fake.random_int(min=1, max=30),  # Random experience between 1 and 30 years
            bio=fake.text(max_nb_chars=200),  # Random bio text
            location=fake.random_element(elements=[
                "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", 
                "Taita Taveta", "Garissa", "Wajir", "Mandera", "Marsabit", 
                "Isiolo", "Meru", "Tharaka-Nithi", "Embu", "Kitui", 
                "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", 
                "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", 
                "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet", "Nandi", 
                "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", 
                "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", 
                "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", 
                "Kisii", "Nyamira", "Nairobi"
            ]),
            profile_picture=fake.image_url()  # Random image URL
        )
        db.session.add(user)
    
    db.session.commit()
    print(f"{num_users} users seeded successfully!")

if __name__ == "__main__":
    with app.app_context():  # Create an application context
        seed_users()  # Seed users
