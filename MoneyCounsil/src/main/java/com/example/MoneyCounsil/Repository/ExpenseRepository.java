package com.example.MoneyCounsil.Repository;

import com.example.MoneyCounsil.Model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense , Long> {
}
