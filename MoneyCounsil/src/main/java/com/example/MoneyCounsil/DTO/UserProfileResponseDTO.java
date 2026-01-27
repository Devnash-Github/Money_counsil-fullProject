package com.example.MoneyCounsil.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class UserProfileResponseDTO {

    private Long id;
    private Double monthlyIncome;
    private String riskTolerance;
    private List<ExpenseDTO> expenses;
    private List<DebtDTO> debts;
}
