package dev.mchq.shop.repository;


import dev.mchq.shop.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface    OrderRepository extends MongoRepository<Order, String> {
    Optional<Order> findProductById(Object id);

    // Tìm tất cả đơn hàng của một người dùng theo userId
    List<Order> findByUserId(String userId);
}
