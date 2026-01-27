package com.example.MoneyCounsil.Repository;

import com.example.MoneyCounsil.Model.Debt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebtRepository extends JpaRepository<Debt , Long> {
}
