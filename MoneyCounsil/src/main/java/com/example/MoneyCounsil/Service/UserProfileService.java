package com.example.MoneyCounsil.Service;


import com.example.MoneyCounsil.DTO.DebtDTO;
import com.example.MoneyCounsil.DTO.ExpenseDTO;
import com.example.MoneyCounsil.DTO.UserProfileRequestDTO;
import com.example.MoneyCounsil.DTO.UserProfileResponseDTO;
import com.example.MoneyCounsil.Model.Debt;
import com.example.MoneyCounsil.Model.Expense;
import com.example.MoneyCounsil.Model.UserProfile;
import com.example.MoneyCounsil.Repository.DebtRepository;
import com.example.MoneyCounsil.Repository.ExpenseRepository;
import com.example.MoneyCounsil.Repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final ExpenseRepository expenseRepository;
    private final DebtRepository debtRepository;

    public UserProfileService(UserProfileRepository userProfileRepository,
                              ExpenseRepository expenseRepository,
                              DebtRepository debtRepository) {
        this.userProfileRepository = userProfileRepository;
        this.expenseRepository = expenseRepository;
        this.debtRepository = debtRepository;
    }

    public UserProfileResponseDTO createUserProfile(UserProfileRequestDTO requestDTO) {
        validateRequest(requestDTO);

        UserProfile userProfile = mapToEntity(requestDTO);

        UserProfile savedProfile = userProfileRepository.save(userProfile);

        return mapToResponseDTO(savedProfile);
    }

    private void validateRequest(UserProfileRequestDTO dto) {
        if (dto.getMonthlyIncome() == null || dto.getMonthlyIncome() <= 0) {
            throw new IllegalArgumentException("Monthly income must be greater than 0");
        }

        if (dto.getExpenses() != null) {
            dto.getExpenses().forEach(expense -> {
                if (expense.getAmount() == null || expense.getAmount() < 0) {
                    throw new IllegalArgumentException("Expense amount cannot be negative");
                }
            });
        }

        if (dto.getDebts() != null) {
            dto.getDebts().forEach(debt -> {
                if (debt.getAmount() == null || debt.getAmount() < 0) {
                    throw new IllegalArgumentException("Debt amount cannot be negative");
                }
                if (debt.getInterest() == null || debt.getInterest() < 0) {
                    throw new IllegalArgumentException("Interest rate cannot be negative");
                }
            });
        }
    }


    private UserProfile mapToEntity(UserProfileRequestDTO dto) {
        UserProfile userProfile = new UserProfile();
        userProfile.setMonthlyIncome(dto.getMonthlyIncome());
        userProfile.setRiskTolerance(dto.getRiskTolerance());

        if (dto.getExpenses() != null) {
            List<Expense> expenses = dto.getExpenses().stream().map(expenseDTO -> {
                Expense expense = new Expense();
                expense.setCategory(expenseDTO.getCategory());
                expense.setAmount(Double.valueOf(expenseDTO.getAmount()));
                expense.setUserProfile(userProfile);
                return expense;
            }).toList();
            userProfile.setExpenses(expenses);
        }

        if (dto.getDebts() != null) {
            List<Debt> debts = dto.getDebts().stream().map(debtDTO -> {
                Debt debt = new Debt();
                debt.setType("BASIC");
                debt.setAmount(Double.valueOf(debtDTO.getAmount()));
                debt.setInterestRate(debtDTO.getInterest());
                debt.setUserProfile(userProfile);
                return debt;
            }).toList();
            userProfile.setDebts(debts);
        }

        return userProfile;
    }



    private UserProfileResponseDTO mapToResponseDTO(UserProfile userProfile) {
        UserProfileResponseDTO response = new UserProfileResponseDTO();
        response.setId(userProfile.getId());
        response.setMonthlyIncome(userProfile.getMonthlyIncome());
        response.setRiskTolerance(userProfile.getRiskTolerance());

        if (userProfile.getExpenses() != null) {
            List<ExpenseDTO> expenseDTOs = userProfile.getExpenses().stream().map(expense -> {
                ExpenseDTO dto = new ExpenseDTO();
                dto.setCategory(expense.getCategory());
                dto.setAmount(expense.getAmount());
                return dto;
            }).toList();
            response.setExpenses(expenseDTOs);
        }

        if (userProfile.getDebts() != null) {
            List<DebtDTO> debtDTOs = userProfile.getDebts().stream().map(debt -> {
                DebtDTO dto = new DebtDTO();
                dto.setExists(true);
                dto.setAmount(debt.getAmount());
                dto.setInterest(debt.getInterestRate());
                return dto;
            }).toList();
            response.setDebts(debtDTOs);
        }

        return response;
    }

    public UserProfileResponseDTO getUserProfileById(Long id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        return mapToResponseDTO(userProfile);
    }

    public UserProfileResponseDTO updateUserProfile(Long id, UserProfileRequestDTO requestDTO) {

        // 1. Fetch existing profile
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        // 2. Update basic fields
        userProfile.setMonthlyIncome(requestDTO.getMonthlyIncome());
        userProfile.setRiskTolerance(requestDTO.getRiskTolerance());

        // 3. Clear old expenses & debts
        userProfile.getExpenses().clear();
        userProfile.getDebts().clear();

        // 4. Add updated expenses
        requestDTO.getExpenses().forEach(expenseDTO -> {
            Expense expense = new Expense();
            expense.setCategory(expenseDTO.getCategory());
            expense.setAmount(expenseDTO.getAmount());
            expense.setUserProfile(userProfile);
            userProfile.getExpenses().add(expense);
        });

        // 5. Add updated debts
        requestDTO.getDebts().forEach(debtDTO -> {
            Debt debt = new Debt();
            debt.setType("BASIC");
            debt.setAmount(debtDTO.getAmount());
            debt.setInterestRate(debtDTO.getInterest());
            debt.setUserProfile(userProfile);
            userProfile.getDebts().add(debt);
        });

        // 6. Save updated profile
        UserProfile updatedProfile = userProfileRepository.save(userProfile);

        // 7. Convert to response DTO
        return mapToResponseDTO(updatedProfile);
    }

    public void deleteUserProfile(Long id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        userProfileRepository.delete(userProfile);
    }
}
