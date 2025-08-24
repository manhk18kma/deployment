package com.example.test_spring_app;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-users")
public class TestUserController {
    private final TestUserRepository repo;

    public TestUserController(TestUserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<TestUser> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public TestUser create(@RequestBody TestUser user) {
        return repo.save(user);
    }
}