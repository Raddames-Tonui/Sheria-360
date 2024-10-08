from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

# Define metadata naming conventions
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

# Initialize SQLAlchemy
db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    work_email = db.Column(db.String(100))
    law_firm = db.Column(db.String(100))
    phone = db.Column(db.String(50))
    expertise = db.Column(db.String(100))
    experience = db.Column(db.Integer)
    bio = db.Column(db.Text)
    location = db.Column(db.String(50))
    firebase_uid = db.Column(db.String(100), unique=True)
    profile_picture = db.Column(db.Text) 

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        """Convert the user instance to a dictionary."""
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'work_email': self.work_email,
            'phone': self.phone,
            'expertise': self.expertise,
            'experience': self.experience,
            'bio': self.bio,
            'location': self.location,
            'law_firm': self.law_firm,
            'profile_picture': self.profile_picture, 
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }


class Case(db.Model, SerializerMixin):
    __tablename__ = 'cases'

    id = db.Column(db.Integer, primary_key=True)
    station = db.Column(db.String(100))
    court = db.Column(db.String(100))
    division = db.Column(db.String(100))
    case_code = db.Column(db.String(100))  
    case_number = db.Column(db.String(50))
    parties = db.Column(db.Text)  
    description = db.Column(db.Text) 
    filed_by = db.Column(db.String(100))  

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        """Convert the case instance to a dictionary."""
        return {
            'id': self.id,
            'station': self.station,
            'court': self.court,
            'division': self.division,
            'case_code': self.case_code,
            'case_number': self.case_number,
            'parties': self.parties,  
            'description': self.description, 
            'filed_by': self.filed_by, 
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
    

class FileUpload(db.Model, SerializerMixin):
    __tablename__ = 'file_uploads'

    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(255), nullable=False) 
    file_url = db.Column(db.String(500), nullable=False)  
    firebase_uid = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)  # To store the legal category of the document
    parent_category = db.Column(db.String(100), nullable=False)  # To store the parent category of the document

    uploaded_at = db.Column(db.DateTime, server_default=db.func.now())


    def to_dict(self):
        """Convert the file upload instance to a dictionary."""
        return {
            'id': self.id,
            'file_name': self.file_name,
            'file_url': self.file_url,
            'category': self.category,
            'parent_category': self.parent_category,
        }
