def debt_agent(data):
    if not data["debt"]["exists"]:
        return {"message": "No active debt"}

    amount = data["debt"]["amount"]
    interest = data["debt"]["interest"]

    strategy = "Avalanche" if interest > 15 else "Snowball"
    monthly_payment = max(int(amount * 0.1), 2000)

    months = amount // monthly_payment

    return {
        "strategy": strategy,
        "monthlyPayment": monthly_payment,
        "monthsToClear": months
    }
