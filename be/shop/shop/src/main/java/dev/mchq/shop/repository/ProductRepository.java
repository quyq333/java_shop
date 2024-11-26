package dev.mchq.shop.repository;


import dev.mchq.shop.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, Integer> {
    Optional<Product> findProductById(Integer id);
}
