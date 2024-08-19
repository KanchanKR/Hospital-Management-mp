
from datetime import timedelta
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from dependencies import get_db
from userAccess import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, get_current_user
from models import Token
from schema import AppointmentCreate, AppointmentResponse, AppointmentUpdate, DoctorCreate, DoctorRead, LoginModel, Patient, PatientCreate, PatientCreateWithUser, User, UserCreate
from database import engine, Base
from models import Patient as PatientModel
from models import Appointment as AppointmentModel


import crud



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)



@app.post("/signup/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user) 

@app.post("/login/")
def login(user: LoginModel, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, email=user.email, password=user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return db_user

@app.post("/patients/", response_model=Patient)
def create_patient(data: PatientCreateWithUser, db: Session = Depends(get_db)):
    return crud.create_patient(db=db, patient=data.patient, user_id=data.user_id)

@app.get("/patients/", response_model=List[Patient])
def read_patients(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    patients = crud.get_patients(db=db, skip=skip, limit=limit)
    return patients

@app.get("/patients/{patient_id}", response_model=Patient)
def read_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = crud.get_patient(db=db, patient_id=patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@app.get("/patients/by_user/", response_model=List[Patient])
def get_patients_by_user_id(user_id: int, db: Session = Depends(get_db)):
    patients = db.query(PatientModel).filter(PatientModel.user_id == user_id).all()
    if not patients:
        raise HTTPException(status_code=404, detail="No patients found for this user.")
    return patients

@app.put("/patients/{patient_id}", response_model=Patient)
def update_patient(patient_id: int, patient: PatientCreate, db: Session = Depends(get_db)):
    db_patient = crud.update_patient(db=db, patient_id=patient_id, patient=patient)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@app.delete("/patients/{patient_id}", response_model=Patient)
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = crud.delete_patient(db=db, patient_id=patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@app.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "scopes": form_data.scopes}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/doctors/", response_model=DoctorCreate)
def create_doctor(doctor: DoctorCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to create doctor")
    return crud.create_doctor(db=db, doctor=doctor, user_id=current_user.id)


@app.get("/doctors/", response_model=List[DoctorRead])
def read_doctors(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    doctors = crud.get_doctors(db=db, skip=skip, limit=limit)
    return doctors

@app.get("/doctors/{doctor_id}", response_model=DoctorCreate)
def read_doctor(doctor_id: int, db: Session = Depends(get_db)):
    db_doctor = crud.get_doctor(db=db, doctor_id=doctor_id)
    if db_doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return db_doctor

@app.post("/appointments/", response_model=AppointmentResponse)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_patient = crud.get_patient(db, patient_id=appointment.patient_id)
    db_doctor = crud.get_doctor(db, doctor_id=appointment.doctor_id)
    if not db_patient or not db_doctor:
        raise HTTPException(status_code=404, detail="Patient or Doctor not found")

    return crud.create_appointment(db=db, appointment=appointment)


@app.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = crud.get_appointment(db=db, appointment_id=appointment_id)
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return db_appointment

@app.get("/appointments/by_user/", response_model=List[AppointmentResponse])
def get_appointments_by_user_id(user_id: int, db: Session = Depends(get_db)):
    appointments = db.query(AppointmentModel).filter(AppointmentModel.user_id == user_id).all()
    if not appointments:
        raise HTTPException(status_code=404, detail="No Appointment found for this user.")
    return appointments


@app.put("/appointments/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(appointment_id: int, appointment: AppointmentUpdate, db: Session = Depends(get_db)):
    updated_appointment = crud.update_appointment(db=db, appointment_id=appointment_id, appointment_update=appointment)
    if not updated_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return updated_appointment



@app.delete("/appointments/{appointment_id}")
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = crud.get_appointment(db=db, appointment_id=appointment_id)
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    crud.delete_appointment(db=db, db_appointment=db_appointment)
    return {"message": "Appointment deleted successfully"}

