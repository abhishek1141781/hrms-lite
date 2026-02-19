import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# This looks at your models.py and creates the tables in Aiven
models.Base.metadata.create_all(bind=engine)

# This will create 50 employees and attendance for them
def seed_data():
    db = SessionLocal()
    try:
        for i in range(1, 15):
            emp_id = f"EMP{i:03}"
            new_emp = models.Employee(
                employee_id=emp_id,
                name=f"Employee {i}",
                email=f"emp{i}@company.com",
                department="Engineering" if i % 2 == 0 else "HR"
            )
            db.add(new_emp)
            
            # Add one attendance record for each
            new_att = models.Attendance(
                employee_id=emp_id,
                date="2026-02-19",
                status="Present" if i % 5 != 0 else "Absent"
            )
            db.add(new_att)
            
        db.commit()
        print("Successfully seeded 50 records!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()