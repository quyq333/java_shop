package dev.mchq.shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {


        @Autowired
        private UserRepository userRepository;

        private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        public String register(User user){
            if (userRepository.findUserByEmail(user.getEmail()) !=null){
                throw new RuntimeException("Email already exits!");

            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return "User register successfully";
        }
        public String login(String email, String password){
            User user = userRepository.findUserByEmail(email);
            if (user==null|| !passwordEncoder.matches(password, user.getPassword())){
                throw new RuntimeException("Invalid email or password!");

            }
            return "Login successfull!";
        }




}
