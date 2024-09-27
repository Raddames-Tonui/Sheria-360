from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declared_attr
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
    __tablename__ = 'users'  # Specify the table name
    
    id = Column(Integer, primary_key=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(100), unique=True)
    phone = Column(String(50))
    expertise = Column(String(100))
    experience = Column(Integer)
    bio = Column(Text)
    location = Column(String(100))
    firebase_uid = Column(String(100), unique=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        """Convert the user instance to a dictionary."""
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'expertise': self.expertise,
            'experience': self.experience,
            'bio': self.bio,
            'location': self.location,
            
        }

