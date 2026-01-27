from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from schemas import FinanceInput
from persona import get_persona
from simulator import future_simulator
from synthesis import council_synthesis
from dashboard_data import dashboard_data

from agents.budget_agent import budget_agent
from agents.savings_agent import savings_agent
from agents.debt_agent import debt_agent
from agents.investment_agent import investment_agent


app = FastAPI()

# CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze(data: FinanceInput):
    # Convert Pydantic model to dict
    data = data.dict()
    print("Received data:", data)

    # 1️⃣ Identify persona
    persona = get_persona(data)

    # 2️⃣ Run agents
    budget = budget_agent(data)
    savings = savings_agent(data, persona)
    debt = debt_agent(data)
    investment = investment_agent(data, persona)

    # 3️⃣ Simulate future
    future = future_simulator(data, savings, debt)

    # 4️⃣ Council synthesis (action plan)
    synthesis = council_synthesis(
        budget=budget,
        savings=savings,
        debt=debt,
        investment=investment
    )

    # 5️⃣ Dashboard-ready chart data
    dashboard = dashboard_data(
        data=data,
        savings=savings,
        debt=debt
    )

    # 6️⃣ Final response
    return {
        "persona": persona,
        "budgetAdvice": budget,
        "savingsPlan": savings,
        "debtPlan": debt,
        "investmentPlan": investment,
        "futureSimulation": future,
        "councilSynthesis": synthesis,
        "dashboardData": dashboard
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )
