package dev.mchq.shop.repository;


import dev.mchq.shop.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    Optional<Order> findProductById(Object id);
}
