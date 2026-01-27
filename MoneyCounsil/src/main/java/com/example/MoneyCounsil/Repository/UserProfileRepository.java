package com.example.MoneyCounsil.Repository;

import com.example.MoneyCounsil.Model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile , Long> {
}
