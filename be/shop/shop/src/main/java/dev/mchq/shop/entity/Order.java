package dev.mchq.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private ObjectId id;
    private String customerName;
    private String phoneNumber;
    private String email;
    private String address;
    private String paymentMethod;
    private String productId;
    private String productName;

}
