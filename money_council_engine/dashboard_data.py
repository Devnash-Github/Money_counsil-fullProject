def dashboard_data(data, savings, debt):
    # Expense breakdown (pie chart)
    expense_chart = [
        {"category": exp["category"], "amount": exp["amount"]}
        for exp in data["expenses"]
    ]

    # Savings growth over 3 months (line chart)
    savings_growth = [
        {"month": i + 1, "amount": savings["monthlySavings"] * (i + 1)}
        for i in range(3)
    ]

    # Debt payoff timeline (line chart)
    initial_debt = data["debt"]["amount"] if data["debt"]["exists"] else 0
    monthly_payment = debt.get("monthlyPayment", 0)

    debt_timeline = [
        {
            "month": i + 1,
            "remainingDebt": max(initial_debt - monthly_payment * (i + 1), 0)
        }
        for i in range(3)
    ]

    return {
        "expenseChart": expense_chart,
        "savingsGrowth": savings_growth,
        "debtTimeline": debt_timeline
    }
