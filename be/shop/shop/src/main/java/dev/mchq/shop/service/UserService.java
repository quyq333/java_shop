package dev.mchq.shop.service;


import dev.mchq.shop.repository.UserRepository;
import dev.mchq.shop.entity.User;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class UserService {
    @Autowired

    private UserRepository userRepository;
//    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String userRegister(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists!";
        }
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User register successfully";

    }

    public boolean authenticate(String email, String password) {

        Optional<User> userOptional = userRepository.findByEmail(email);


        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getPassword().equals(password);
        }

        return false;
    }
    public List<User> allUsers(){
        return userRepository.findAll();
    }
}



