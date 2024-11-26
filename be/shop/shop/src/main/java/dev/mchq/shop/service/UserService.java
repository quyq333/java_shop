package dev.mchq.shop.service;


import dev.mchq.shop.repository.UserRepository;
import dev.mchq.shop.entity.User;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

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
        // Tìm người dùng qua email, trả về Optional<User>
        Optional<User> userOptional = userRepository.findByEmail(email);

        // Kiểm tra nếu người dùng tồn tại và so sánh mật khẩu
        if (userOptional.isPresent()) {
            User user = userOptional.get();  // Lấy đối tượng User từ Optional
            return user.getPassword().equals(password);  // So sánh mật khẩu
        }

        return false;  // Không tìm thấy người dùng hoặc mật khẩu sai
    }
}



