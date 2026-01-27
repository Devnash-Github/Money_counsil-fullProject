package com.example.MoneyCounsil.Integration;

import com.example.MoneyCounsil.DTO.DebtDTO;
import com.example.MoneyCounsil.DTO.ExpenseDTO;
import com.example.MoneyCounsil.Model.Debt;
import com.example.MoneyCounsil.Model.Expense;
import lombok.*;

import java.util.List ;

import java.util.List;
@Getter
@Setter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDTO {

    private int income;
    private List<ExpenseDTO> expenses;
    private DebtDTO debt;
    private String risk;
    private String userType;

}
