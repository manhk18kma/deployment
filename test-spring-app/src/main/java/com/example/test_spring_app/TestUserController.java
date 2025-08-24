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

    // Lấy toàn bộ user
    @GetMapping
    public List<TestUser> getAll() {
        return repo.findAll();
    }

    // Lấy user theo id
    @GetMapping("/{id}")
    public TestUser getById(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Tạo mới user
    @PostMapping
    public TestUser create(@RequestBody TestUser user) {
        return repo.save(user);
    }

    // Cập nhật user
    @PutMapping("/{id}")
    public TestUser update(@PathVariable Long id, @RequestBody TestUser user) {
        return repo.findById(id)
                .map(u -> {
                    u.setName(user.getName());
                    return repo.save(u);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Xóa user
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
