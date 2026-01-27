def get_persona(data):
    user_type = data["userType"]
    risk = data["risk"]
    debt_exists = data["debt"]["exists"]

    if user_type == "student":
        persona = "Student-Conservative"
        reason = "Limited income and early career stage"

    elif user_type == "freelancer":
        persona = "Freelancer-Volatile"
        reason = "Irregular income requires higher safety buffer"

    else:  # salaried
        if debt_exists and risk == "low":
            persona = "Salaried-Stability"
            reason = "Stable income with focus on debt reduction"
        else:
            persona = "Salaried-Growth"
            reason = "Stable income with capacity to invest"

    return {
        "type": persona,
        "reason": reason
    }
