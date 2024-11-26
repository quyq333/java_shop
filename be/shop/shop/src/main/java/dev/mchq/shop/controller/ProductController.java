package dev.mchq.shop.controller;


import dev.mchq.shop.service.ProductService;
import dev.mchq.shop.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<List<Product>>(productService.allProducts(), HttpStatus.OK);

    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable Integer id ){
        return new ResponseEntity<Optional<Product>>(productService.singleProduct(id), HttpStatus.OK);

    }
}
