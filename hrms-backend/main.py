from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, database
from sqlalchemy.exc import IntegrityError

app = FastAPI()

# Enable CORS so your React app can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
models.Base.metadata.create_all(bind=database.engine)

# ADD employee
@app.post("/employees/", response_model=schemas.EmployeeCreate, status_code=status.HTTP_201_CREATED)
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(database.get_db)):
    try:
        # Check for duplicate Employee ID manually for a better error message
        existing_id = db.query(models.Employee).filter(models.Employee.employee_id == emp.employee_id).first()
        if existing_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail=f"Employee ID '{emp.employee_id}' already exists."
            )

        new_emp = models.Employee(**emp.dict())
        db.add(new_emp)
        db.commit()
        db.refresh(new_emp)
        return new_emp

    except IntegrityError:
        # Catch cases where Email might be duplicate (unique constraint in DB)
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An employee with this email already exists."
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected server error occurred."
        )
    
# List of all empoyees
@app.get("/employees/")
def list_employees(db: Session = Depends(database.get_db)):
    return db.query(models.Employee).all()


# DELETE EMP
@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: str, db: Session = Depends(database.get_db)):
    emp = db.query(models.Employee).filter(models.Employee.employee_id == emp_id).first()
    
    if not emp:
        # Proper 404 Not Found status
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {emp_id} not found."
        )
        
    db.delete(emp)
    db.commit()
    return {"message": "Employee successfully deleted"}


# RECORD EMP ATTENDANCE
@app.post("/attendance/")
def mark_attendance(att: schemas.AttendanceMark, db: Session = Depends(database.get_db)):
    # Validation: Ensure the employee actually exists before marking attendance
    emp_exists = db.query(models.Employee).filter(models.Employee.employee_id == att.employee_id).first()
    if not emp_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cannot mark attendance. Employee does not exist."
        )
    
    new_att = models.Attendance(**att.dict())
    db.add(new_att)
    db.commit()
    return {"message": "Attendance recorded successfully"}


# GET ATTEdence by id
@app.get("/attendance/{emp_id}")
def get_attendance(emp_id: str, db: Session = Depends(database.get_db)):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == emp_id).all()

