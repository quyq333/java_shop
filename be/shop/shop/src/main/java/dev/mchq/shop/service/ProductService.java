package dev.mchq.shop.service;


import dev.mchq.shop.repository.ProductRepository;
import dev.mchq.shop.entity.Product;
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
    public Optional<Product> singleProduct(Integer id){
        return productRepository.findProductById(id);
    }
    public Product addProduct(Product product){
        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id); // Xóa sản phẩm bằng id
    }
}

