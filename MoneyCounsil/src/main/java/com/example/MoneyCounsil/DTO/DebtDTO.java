    package com.example.MoneyCounsil.DTO;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class DebtDTO {
        private Boolean exists;  // Changed from 'type'
        private Double amount;  // Changed from Double to Integer
        private Double interest;  // Changed from 'interestRate' and Double to Integer
    }
