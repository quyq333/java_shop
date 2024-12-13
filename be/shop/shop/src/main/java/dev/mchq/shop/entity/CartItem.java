package dev.mchq.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    Integer id;
    int quantity;
    String poster;
    String title;
    Integer price;
}
