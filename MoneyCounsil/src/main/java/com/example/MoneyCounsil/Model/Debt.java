package com.example.MoneyCounsil.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Debt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private Double amount;

    private Double interestRate;

    public Debt(String type,Double amount,Double interestRate){
        this.type = type ;
        this.amount = amount  ;
        this.interestRate = interestRate ;
    }
    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;
}
