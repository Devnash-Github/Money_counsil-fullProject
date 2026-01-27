package com.example.MoneyCounsil.Integration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DebtPlanDTO {

    private String strategy;
    private int monthlyPayment;
    private int monthsToClear;
}
