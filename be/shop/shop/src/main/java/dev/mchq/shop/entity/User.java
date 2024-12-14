package dev.mchq.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Document(collection = "users")
@Data

@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String gender;

    private String password;
    private String role;

    // Thêm giỏ hàng
    private List<CartItem> cart;
    // Constructor
    public User() {
        this.id = UUID.randomUUID().toString(); // Tạo ID tự động kiểu chuỗi
    }
    // Constructor khởi tạo ID tự động
    public User(String name, String email, String phoneNumber, String address, String gender, String password, List<CartItem> cart) {
        this.id = UUID.randomUUID().toString(); // Tạo ID tự động kiểu chuỗi
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.gender = gender;
        this.password = password;
        this.cart = cart;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }




}
