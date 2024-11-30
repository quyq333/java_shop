package dev.mchq.shop.controller;


import dev.mchq.shop.entity.Product;
import dev.mchq.shop.service.UserService;
import dev.mchq.shop.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public String register(@RequestBody User user){

        return userService.userRegister(user);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        boolean isAuthenticated = userService.authenticate(user.getEmail(), user.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }
    @GetMapping("users/{email}")
    public ResponseEntity<Optional<User>> getSingleUser(@PathVariable String email ){
        return new ResponseEntity<Optional<User>>(userService.singleUser(email), HttpStatus.OK);
    }
    // Xóa người dùng theo email
    @DeleteMapping("/users/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        Optional<User> existingEmail = userService.singleUser(email);
        if (existingEmail.isPresent()) {
            userService.deleteUserByEmail(email); // Gọi service để xóa sản phẩm
            return ResponseEntity.noContent().build(); // Trả về status 204 (No Content) khi xóa thành công
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Trả về 404 nếu không tìm thấy sản phẩm
        }
    }


}
