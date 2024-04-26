package com.akhil.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String password;
  private String email;
  private String fullName;
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
      createdAt = LocalDateTime.now();
  }
}
