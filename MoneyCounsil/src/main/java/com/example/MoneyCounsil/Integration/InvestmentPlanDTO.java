package com.example.MoneyCounsil.Integration;

import lombok.Data;
import java.util.List ;

@Data
public class InvestmentPlanDTO {
    private List<String> recommendedOptions;
    private int startingAmount;
}
