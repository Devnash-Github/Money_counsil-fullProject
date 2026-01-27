def savings_agent(data, persona):
    income = data["income"]

    if "Student" in persona["type"]:
        savings_rate = 0.1
        emergency_months = 3
    elif "Freelancer" in persona["type"]:
        savings_rate = 0.2
        emergency_months = 6
    else:
        savings_rate = 0.15
        emergency_months = 4

    monthly_savings = int(income * savings_rate)

    return {
        "monthlySavings": monthly_savings,
        "emergencyFundTarget": monthly_savings * emergency_months,
        "goals": ["Emergency Fund", "Short-term Goals"]
    }
