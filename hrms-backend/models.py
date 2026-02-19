from sqlalchemy import Column, Integer, String, Date
from database import Base

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), unique=True, index=True) # Unique ID like EMP101
    name = Column(String(100))
    email = Column(String(100), unique=True)
    department = Column(String(100))

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50))
    date = Column(Date)
    status = Column(String(20)) # "Present" or "Absent"