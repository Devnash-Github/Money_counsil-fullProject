def demo_personas():
    return {
        "student_20k": {
            "income": 20000,
            "expenses": [
                {"category": "rent", "amount": 6000},
                {"category": "food", "amount": 5000},
                {"category": "transport", "amount": 2000},
                {"category": "entertainment", "amount": 3000},
                {"category": "misc", "amount": 2000}
            ],
            "debt": {"exists": False, "amount": 0, "interest": 0},
            "risk": "low",
            "userType": "student"
        },
        "salaried_50k": {
            "income": 50000,
            "expenses": [
                {"category": "rent", "amount": 15000},
                {"category": "food", "amount": 8000},
                {"category": "transport", "amount": 3000},
                {"category": "entertainment", "amount": 4000},
                {"category": "misc", "amount": 2000}
            ],
            "debt": {"exists": True, "amount": 30000, "interest": 24},
            "risk": "medium",
            "userType": "salaried"
        },
        "freelancer_35k": {
            "income": 35000,
            "expenses": [
                {"category": "rent", "amount": 12000},
                {"category": "food", "amount": 7000},
                {"category": "transport", "amount": 3000},
                {"category": "entertainment", "amount": 3000},
                {"category": "misc", "amount": 2000}
            ],
            "debt": {"exists": True, "amount": 15000, "interest": 18},
            "risk": "high",
            "userType": "freelancer"
        }
    }
