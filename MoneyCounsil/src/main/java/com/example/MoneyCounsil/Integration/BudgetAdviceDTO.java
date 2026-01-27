package com.example.MoneyCounsil.Integration;
import lombok.Data;

import java.util.List ;

@Data
public class BudgetAdviceDTO {
     private List<BudgetSuggestionDTO> suggestions;
}
