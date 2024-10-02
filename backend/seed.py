from faker import Faker
from app import app, db
from models import User, Case  # Ensure these models exist

fake = Faker()

def clear_existing_records():
    """Clear all records from the User and Case tables."""
    db.session.query(User).delete()
    db.session.query(Case).delete()
    db.session.commit()
    print("All existing records cleared!")

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
            experience=fake.random_int(min=1, max=30),
            bio=fake.text(max_nb_chars=200),
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
            firebase_uid=fake.uuid4(),  # Generating a unique firebase UID
            profile_picture=fake.image_url()  # Random image URL
        )
        db.session.add(user)
    
    db.session.commit()
    print(f"{num_users} users seeded successfully!")

def seed_cases():
    # Define the stations, courts, and divisions with case types
    stations = {
        "Milimani Law Courts": {
            "Milimani Environment and Land Court": [
                ["C100", "Environment and Land Court"],
                ["C101", "ELC Land"],
                ["C102", "ELC Environment & Planning"],
            ],
            "Milimani High Court": [
                ["C103", "High Court Judicial Review"],
                ["C104", "High Court Anti Corruption and Economic Crimes"],
                ["C105", "High Court Family"],
                ["C106", "High Court Commercial and Tax"],
                ["C107", "High Court Constitution and Human Rights"],
                ["C108", "High Court Civil"],
                ["C109", "Court Annexed Mediation"],
                ["C110", "High Court Criminal"],
            ],
            "Milimani Magistrate Court": [
                ["C111", "Magistrate Court Anti Corruption"],
                ["C112", "Magistrate Court Criminal"],
                ["C113", "Magistrate Court Traffic Case"],
                ["C114", "Magistrate Court Children"],
            ],
        },
        "Nairobi City Law Courts": {
            "Nairobi City Magistrates Court": [
                ["C115", "Magistrate Court Traffic Case"],
                ["C116", "Magistrate Court Petty Criminal"],
                ["C117", "Magistrate Court Traffic Case"],
                ["C118", "Magistrates Gender Justice Criminal Case"],
                ["C119", "Inquest"],
                ["C120", "Magistrate Court Criminal Miscellaneous"],
            ],
        },
        "Naivasha ELC Environment and Land Court": {
            "Naivasha High Court": [
                ["C121", "High Court Div"],
            ],
            "Naivasha Magistrate Court": [
                ["C122", "Magistrate Court Traffic"],
                ["C123", "Magistrate Court Civil"],
                ["C124", "Magistrate Court Criminal"],
            ],
            "Naivasha Small Claims Court": [
                ["C125", "Small Claims Court"],
            ],
        },
    }

    # Counter for case_number (starting from 1000)
    case_number_counter = 1000

    # Seed the cases
    for station_name, courts in stations.items():
        for court_name, divisions in courts.items():
            for case_code, division_name in divisions:
                case = Case(
                    station=station_name,
                    court=court_name,
                    division=division_name,
                    case_code=case_code,
                    case_number=f"2024-{case_number_counter}",
                    parties=fake.name() + " vs " + fake.name(),
                    description=fake.text(max_nb_chars=200),
                    filed_by=fake.name(),
                )
                db.session.add(case)

                # Increment the case number
                case_number_counter += 1

    db.session.commit()
    print("Cases seeded successfully!")

if __name__ == "__main__":
    with app.app_context():
        clear_existing_records()  # Clear existing records before seeding
        seed_users()
        seed_cases()
