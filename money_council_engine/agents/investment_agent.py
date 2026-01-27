def investment_agent(data, persona):
    risk = data["risk"]

    if risk == "low":
        options = ["PPF"]
    elif risk == "medium":
        options = ["Index Fund SIP"]
    else:
        options = ["Index Fund SIP", "Equity Mutual Fund"]

    return {
        "recommendedOptions": options,
        "startingAmount": 1000
    }
