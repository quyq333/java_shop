package dev.mchq.shop.repository;


import dev.mchq.shop.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
