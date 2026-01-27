package com.example.MoneyCounsil.Integration;
import lombok.Data;

import java.util.List ;

@Data
public class SavingsPlanDTO {
    private int monthlySavings;
    private int emergencyFundTarget;
    private List<String> goals;

}
