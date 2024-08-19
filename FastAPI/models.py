from pydantic import BaseModel
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base
from sqlalchemy.orm import relationship

class Token(BaseModel):
    access_token: str
    token_type: str

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(100))
    role = Column(String(50))
    patients = relationship("Patient", back_populates="user")
    doctors = relationship('Doctor', back_populates='user')
    appointments = relationship("Appointment", back_populates="user")


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key= True, index= True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String(100), index = True)
    age = Column(Integer)
    gender = Column(String(50))
    address = Column(String(100))

    user = relationship("User", back_populates="patients")
    appointments = relationship("Appointment", back_populates="patients")

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key= True, index= True)
    user_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String(100), index = True)
    YearOfExp = Column(Integer)
    department_id = Column(Integer, ForeignKey('departments.id'))

    user = relationship("User", back_populates="doctors")
    department = relationship('Departement', back_populates='doctors')
    appointments = relationship("Appointment", back_populates="doctors")

class Departement(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key= True, index= True, autoincrement=True)
    name = Column(String(100), index = True)

    doctors = relationship('Doctor', back_populates='department')



class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key= True, index= True)
    user_id = Column(Integer, ForeignKey('users.id'))
    patient_id = Column(Integer, ForeignKey('patients.id'))
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    status = Column(Boolean, default=False)
    date = Column(String(50), default=False)
    time_slot = Column(String(50))

    doctors = relationship("Doctor", back_populates="appointments")
    patients = relationship("Patient", back_populates="appointments")
    user = relationship("User", back_populates="appointments")

