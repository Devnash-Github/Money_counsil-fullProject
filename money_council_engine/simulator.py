def future_simulator(data, savings_plan, debt_plan):
    current_savings = 0
    optimized_savings = savings_plan["monthlySavings"] * 3

    debt = data["debt"]["amount"] if data["debt"]["exists"] else 0
    optimized_debt = max(debt - (debt_plan.get("monthlyPayment", 0) * 3), 0)

    return {
        "currentPath": {
            "savingsAfter3Months": current_savings,
            "debtAfter3Months": debt
        },
        "optimizedPath": {
            "savingsAfter3Months": optimized_savings,
            "debtAfter3Months": optimized_debt
        },
        "netImpact": {
            "additionalSavings": optimized_savings - current_savings,
            "debtReduced": debt - optimized_debt
        }
    }