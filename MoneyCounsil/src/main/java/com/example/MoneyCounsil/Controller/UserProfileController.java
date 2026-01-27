package com.example.MoneyCounsil.Controller;

import com.example.MoneyCounsil.DTO.UserProfileRequestDTO;
import com.example.MoneyCounsil.DTO.UserProfileResponseDTO;
import com.example.MoneyCounsil.Service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/profile")
public class UserProfileController {
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public ResponseEntity<UserProfileResponseDTO> createUserProfile(@RequestBody @Valid UserProfileRequestDTO requestDTO) {

        UserProfileResponseDTO response = userProfileService.createUserProfile(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileResponseDTO> getUserProfileById(
            @PathVariable Long id) {

        UserProfileResponseDTO response =
                userProfileService.getUserProfileById(id);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileResponseDTO> updateUserProfile(
            @PathVariable Long id,
            @RequestBody UserProfileRequestDTO requestDTO) {

        UserProfileResponseDTO response =
                userProfileService.updateUserProfile(id, requestDTO);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserProfile(@PathVariable Long id) {

        userProfileService.deleteUserProfile(id);

        return ResponseEntity.ok("User profile deleted successfully");
    }



}
