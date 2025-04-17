package com.example.userservice.services;

import com.example.userservice.models.User;
import com.example.userservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User createCustomer(User customer) { return userRepository.save(customer); }
    public List<User> getAllCustomers() { return userRepository.findAll(); }
    public User getCustomerById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }
    public User updateCustomer(int id, User customerDetails) {
        User customer = getCustomerById(id);
        customer.setName(customerDetails.getName());
        customer.setAddress(customerDetails.getAddress());
        customer.setPhone(customerDetails.getPhone());
        return userRepository.save(customer);
    }
    public void deleteCustomer(int id) { userRepository.deleteById(id); }
}
