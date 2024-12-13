package dev.mchq.shop.controller;


import dev.mchq.shop.entity.CartItem;
import dev.mchq.shop.entity.Product;
import dev.mchq.shop.repository.UserRepository;
import dev.mchq.shop.service.UserService;
import dev.mchq.shop.entity.User;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;



    @PostMapping("/register")
    public String register(@RequestBody User user){

        return userService.userRegister(user);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // Xác thực người dùng
        boolean isAuthenticated = userService.authenticate(user.getEmail(), user.getPassword());

        if (isAuthenticated) {
            // Lấy thông tin người dùng từ cơ sở dữ liệu
            User authenticatedUser = userService.findByEmail(user.getEmail());

            if (authenticatedUser != null) {
                // Trả về phản hồi bao gồm id và thông báo
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("id", authenticatedUser.getId()); // Lấy id thành chuỗi
                response.put("name", authenticatedUser.getName()); // Tuỳ chọn: Trả thêm thông tin khác nếu cần

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tài khoản hoặc mật khẩu!");
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.allUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            // Log lỗi chi tiết
            System.err.println("Error fetching users: " + e.getMessage());
            e.printStackTrace();
            // Trả về phản hồi lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
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
    @PostMapping("/{userId}/cart")
    public ResponseEntity<User> addToCart(@PathVariable String userId, @RequestBody CartItem cartItem) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.getCart().add(cartItem);
        userRepository.save(user); // Lưu lại giỏ hàng
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{userId}/cart/{productId}")
    public ResponseEntity<User> removeFromCart(@PathVariable String userId, @PathVariable String productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.getCart().removeIf(item -> item.getId().equals(productId));
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{userId}/cart")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user.getCart());
    }

    @PutMapping("/{userId}/cart")
    public ResponseEntity<User> updateCart(@PathVariable String userId, @RequestBody CartItem cartItem) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getCart() == null) {
            user.setCart(new ArrayList<>());
        }

        boolean exists = false;
        for (CartItem item : user.getCart()) {
            if (item.getId().equals(cartItem.getId())) {
                item.setQuantity(item.getQuantity() + cartItem.getQuantity());
                exists = true;
                break;
            }
        }

        if (!exists) {
            user.getCart().add(cartItem);
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

}
