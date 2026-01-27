package com.example.MoneyCounsil.Integration;

import lombok.Data;

@Data
public class BudgetSuggestionDTO {
    private String category;
    private int currentSpend;
    private int suggestedCutPercent;
    private int estimatedSavings;
}
