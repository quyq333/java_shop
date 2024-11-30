package dev.mchq.shop.repository;

import dev.mchq.shop.entity.Product;
import dev.mchq.shop.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    
    void deleteById(ObjectId id);  // Xóa người dùng theo ObjectId
    void deleteByEmail(String email);  // Xóa người dùng theo email




}
