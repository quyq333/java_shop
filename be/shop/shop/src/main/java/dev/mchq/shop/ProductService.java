package dev.mchq.shop;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> allProducts(){

        return productRepository.findAll();

    }
    public Optional<Product> singleProduct(String productId){
        return productRepository.findProductByProductId(productId);
    }
}