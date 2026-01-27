def council_synthesis(budget, savings, debt, investment):
    actions = []

    # Budget actions
    for item in budget["suggestions"]:
        actions.append(
            f"Reduce {item['category']} spending by {item['suggestedCutPercent']}% "
            f"(save ₹{item['estimatedSavings']} per month)"
        )

    # Savings actions
    actions.append(
        f"Save ₹{savings['monthlySavings']} automatically every month"
    )
    actions.append(
        f"Build emergency fund up to ₹{savings['emergencyFundTarget']}"
    )

    # Debt actions
    if "strategy" in debt:
        actions.append(
            f"Repay debt using {debt['strategy']} strategy "
            f"with ₹{debt['monthlyPayment']} per month"
        )

    # Investment actions
    for option in investment["recommendedOptions"]:
        actions.append(
            f"Invest ₹{investment['startingAmount']} per month in {option}"
        )

    return {
        "monthlyActionPlan": actions
    }
