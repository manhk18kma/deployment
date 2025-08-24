package com.example.test_spring_app;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TestUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}