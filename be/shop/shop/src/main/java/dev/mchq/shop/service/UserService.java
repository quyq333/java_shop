package dev.mchq.shop.service;


import dev.mchq.shop.entity.User;
import dev.mchq.shop.repository.UserRepository;
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

    public List<User> allUsers() {
        return userRepository.findAll();
    }


    public boolean deleteUserByEmail(String email) {
        // Tìm người dùng theo email
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            userRepository.delete(user); // Xóa người dùng nếu tồn tại
            return true;
        }
        return false;
    }
    public Optional<User> singleUser(String email){
        return userRepository.findByEmail(email);
    }


    public User findByEmail(String email) {
        // Sử dụng Optional để lấy User hoặc trả về null nếu không tìm thấy
        return userRepository.findByEmail(email).orElse(null);
    }

    // Cập nhật thông tin người dùng
    public User updateUser(String userId, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(userId);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setAddress(updatedUser.getAddress());
            existingUser.setGender(updatedUser.getGender());

            // Mã hóa mật khẩu trước khi lưu
            existingUser.setPassword(updatedUser.getPassword());

            return userRepository.save(existingUser);  // Lưu thông tin người dùng đã cập nhật
        } else {
            return null;  // Trả về null nếu không tìm thấy người dùng
        }
    }




}



