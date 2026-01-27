package com.example.MoneyCounsil.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class UserProfileRequestDTO {
    private Double monthlyIncome;
    private String riskTolerance;
    private List<ExpenseDTO> expenses;
    private List<DebtDTO> debts;


}
