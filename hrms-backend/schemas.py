from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional

class EmployeeCreate(BaseModel):
    # Field(...) ensures the field is required and not empty
    employee_id: str = Field(..., min_length=3, max_length=20)
    name: str = Field(..., min_length=2)
    email: EmailStr  # Automatically validates email format
    department: str = Field(...)

class AttendanceMark(BaseModel):
    employee_id: str = Field(...)
    date: date
    status: str = Field(..., pattern="^(Present|Absent)$") # Only allows these two strings