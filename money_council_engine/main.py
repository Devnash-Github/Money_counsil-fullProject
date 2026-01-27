from fastapi import FastAPI
from persona import get_persona
from agents.budget_agent import budget_agent
from agents.savings_agent import savings_agent
from agents.debt_agent import debt_agent
from agents.investment_agent import investment_agent
from simulator import future_simulator
import uvicorn
from schemas import FinanceInput

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(data: FinanceInput):
    data = data.dict()
    print(data)  # For debugging

    persona = get_persona(data)
    budget = budget_agent(data)
    savings = savings_agent(data, persona)
    debt = debt_agent(data)
    investment = investment_agent(data, persona)
    future = future_simulator(data, savings, debt)

    return {
        "persona": persona,
        "budgetAdvice": budget,
        "savingsPlan": savings,
        "debtPlan": debt,
        "investmentPlan": investment,
        "futureSimulation": future
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )