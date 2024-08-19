
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str
    role: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class LoginModel(BaseModel):
    email: str
    password: str
        
class PatientBase(BaseModel):
    name: str
    age: int
    address: str
    gender: str

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

    class Config:
        from_attributes = True

class PatientCreateWithUser(BaseModel):
    patient: PatientCreate
    user_id: int

class DepartmentCreate(BaseModel):
    name: str

class DoctorCreate(BaseModel):
    name: str
    YearOfExp: int

class DoctorRead(BaseModel):
    id: int  # Add the id field
    name: str
    YearOfExp: int

    class Config:
        from_attributes = True

class AppointmentCreate(BaseModel):
    user_id: int
    patient_id: int
    date: str
    time_slot:str
    doctor_id: int
    status: bool = False


class AppointmentUpdate(BaseModel):
    doctor_id: int = None
    date: str = None
    time_slot:str = None


class AppointmentResponse(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    date: str
    time_slot:str
    status: bool

    class Config:
        from_attributes = True