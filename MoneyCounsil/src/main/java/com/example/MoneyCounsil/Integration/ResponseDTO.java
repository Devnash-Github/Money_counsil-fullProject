package com.example.MoneyCounsil.Integration;

import lombok.Data;

@Data
public class ResponseDTO {
    private PersonaDTO persona;
    private BudgetAdviceDTO budgetAdvice;
    private SavingsPlanDTO savingsPlan;
    private DebtPlanDTO debtPlan;
    private InvestmentPlanDTO investmentPlan;
    private FutureSimulationDTO futureSimulation;
}
