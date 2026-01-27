package com.example.MoneyCounsil.Controller;

import com.example.MoneyCounsil.DTO.DebtDTO;
import com.example.MoneyCounsil.DTO.ExpenseDTO;
import com.example.MoneyCounsil.Integration.*;
import com.example.MoneyCounsil.Model.Debt;
import com.example.MoneyCounsil.Model.Expense;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AiAgent {

        WebClient web ;

        public AiAgent(WebClient web){
                this.web = web ;
        }

        @PostMapping("/api/v1/ai/analyse")
        public ResponseEntity<ResponseDTO> getResponse(@RequestBody RequestDTO dto ){
//                List<ExpenseDTO> expenses = new ArrayList<>();
//                expenses.add(new ExpenseDTO("Rent",3000.0));
//                DebtDTO debt = new DebtDTO(true,3000.0,12.0);
//                RequestDTO dto = RequestDTO.builder().risk("low").expenses(expenses).debt(debt).income(200000).userType("student").build();
                ResponseDTO response = web
                        .post()
                        .uri("http://127.0.0.1:8000/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(dto)
                        .retrieve()
                        .bodyToMono(ResponseDTO.class)
                        .block();
                return ResponseEntity.ok().body(response) ;
        }
        @GetMapping("/api/v1/ai/analyse/persona")
        public ResponseEntity<PersonaDTO> getPersona(){
                List<ExpenseDTO> expenses = new ArrayList<>();
                expenses.add(new ExpenseDTO("Rent",3000.0));
                DebtDTO debt = new DebtDTO(true,3000.0,12.0);
                RequestDTO dto = RequestDTO.builder().risk("low").expenses(expenses).debt(debt).income(200000).userType("student").build();
                ResponseDTO response = web
                        .post()
                        .uri("http://127.0.0.1:8000/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(dto)
                        .retrieve()
                        .bodyToMono(ResponseDTO.class)
                        .block();
                return ResponseEntity.ok().body(response.getPersona()) ;
        }

        @GetMapping("/api/v1/ai/analyse/Budget")
        public ResponseEntity<BudgetAdviceDTO> getBudget(){
                List<ExpenseDTO> expenses = new ArrayList<>();
                expenses.add(new ExpenseDTO("Rent",3000.0));
                DebtDTO debt = new DebtDTO(true,3000.0,12.0);
                RequestDTO dto = RequestDTO.builder().risk("low").expenses(expenses).debt(debt).income(200000).userType("student").build();
                ResponseDTO response = web
                        .post()
                        .uri("http://127.0.0.1:8000/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(dto)
                        .retrieve()
                        .bodyToMono(ResponseDTO.class)
                        .block();
                return ResponseEntity.ok().body(response.getBudgetAdvice()) ;
        }

        @GetMapping("/api/v1/ai/analyse/savings")
        public ResponseEntity<SavingsPlanDTO> getSavings(){
                List<ExpenseDTO> expenses = new ArrayList<>();
                expenses.add(new ExpenseDTO("Rent",3000.0));
                DebtDTO debt = new DebtDTO(true,3000.0,12.0);
                RequestDTO dto = RequestDTO.builder().risk("low").expenses(expenses).debt(debt).income(200000).userType("student").build();
                ResponseDTO response = web
                        .post()
                        .uri("http://127.0.0.1:8000/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(dto)
                        .retrieve()
                        .bodyToMono(ResponseDTO.class)
                        .block();
                return ResponseEntity.ok().body(response.getSavingsPlan()) ;
        }

        @GetMapping("/api/v1/ai/analyse/debt")
        public ResponseEntity<DebtPlanDTO> getdebtPlan(){
                List<ExpenseDTO> expenses = new ArrayList<>();
                expenses.add(new ExpenseDTO("Rent",3000.0));
                DebtDTO debt = new DebtDTO(true,3000.0,12.0);
                RequestDTO dto = RequestDTO.builder().risk("low").expenses(expenses).debt(debt).income(200000).userType("student").build();
                ResponseDTO response = web
                        .post()
                        .uri("http://127.0.0.1:8000/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(dto)
                        .retrieve()
                        .bodyToMono(ResponseDTO.class)
                        .block();
                return ResponseEntity.ok().body(response.getDebtPlan()) ;
        }


        @GetMapping("/api/v1/ai/analyse/investment")
        public ResponseEntity<InvestmentPlanDTO> getInvestmentPlan(){
                List<ExpenseDTO> expenses = new ArrayList<>();
                expenses.add(new ExpenseDTO("Rent",3000.0));
                DebtDTO debt = new DebtDTO(true,3000.0,12.0);
                RequestDTO dto = RequestDTO.builder().risk("low").expenses(expenses).debt(debt).income(200000).userType("student").build();
                ResponseDTO response = web
                        .post()
                        .uri("http://127.0.0.1:8000/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(dto)
                        .retrieve()
                        .bodyToMono(ResponseDTO.class)
                        .block();
                return ResponseEntity.ok().body(response.getInvestmentPlan()) ;
        }

        @GetMapping("/api/v1/ai/analyse/Future")
        public ResponseEntity<FutureSimulationDTO> getFutureSimulation(){
                List<ExpenseDTO> expenses = new ArrayList<>();
                expenses.add(new ExpenseDTO("Rent",3000.0));
                DebtDTO debt = new DebtDTO(true,3000.0,12.0);
                RequestDTO dto = RequestDTO.builder().risk("low").expenses(expenses).debt(debt).income(200000).userType("student").build();
                ResponseDTO response = web
                        .post()
                        .uri("http://127.0.0.1:8000/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(dto)
                        .retrieve()
                        .bodyToMono(ResponseDTO.class)
                        .block();
                return ResponseEntity.ok().body(response.getFutureSimulation()) ;
        }

}
