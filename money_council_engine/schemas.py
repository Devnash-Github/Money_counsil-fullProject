from pydantic import BaseModel, Field
from typing import Dict, List, Literal

class Expense(BaseModel):
    category: str
    amount: float

class Debt(BaseModel):
    exists: bool
    amount: float = Field(ge=0)
    interest: float = Field(ge=0, le=100)


class FinanceInput(BaseModel):
    income: int = Field(gt=0)
    expenses:List[Expense]
    debt: Debt
    risk: Literal["low", "medium", "high"]
    userType: Literal["student", "salaried", "freelancer"]
