package com.example.userservice.controllers;

import com.example.userservice.models.User;
import com.example.userservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping
    public ResponseEntity<User> createCustomer(@RequestBody User user) {
        return ResponseEntity.ok(userService.createCustomer(user));
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllCustomers() {
        return ResponseEntity.ok(userService.getAllCustomers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getCustomerById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getCustomerById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateCustomer(@PathVariable int id, @RequestBody User customer) {
        return ResponseEntity.ok(userService.updateCustomer(id, customer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable int id) {
        userService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}
