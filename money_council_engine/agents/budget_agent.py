def budget_agent(data):
    income = data["income"]
    expenses_list = data["expenses"]  # This is a list of {category, amount}
    
    # Convert list to dict for easier processing
    expenses = {exp["category"]: exp["amount"] for exp in expenses_list}
    
    expense_ratios = {
        k: v / income for k, v in expenses.items()
    }

    # sort by highest spending ratio
    sorted_expenses = sorted(
        expense_ratios.items(),
        key=lambda x: x[1],
        reverse=True
    )

    suggestions = []
    for category, ratio in sorted_expenses[:2]:
        cut_percent = 0.1 if ratio < 0.25 else 0.2
        savings = int(expenses[category] * cut_percent)

        suggestions.append({
            "category": category,
            "currentSpend": int(expenses[category]),
            "suggestedCutPercent": int(cut_percent * 100),
            "estimatedSavings": savings
        })

    return {
        "suggestions": suggestions
    }