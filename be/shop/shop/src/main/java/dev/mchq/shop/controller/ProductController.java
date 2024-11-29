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
    @PostMapping("/products/create")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        return ResponseEntity.ok(productService.addProduct(product));
    }
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Integer id,
            @RequestBody Product updatedProduct) {
        Optional<Product> existingProduct = productService.singleProduct(id);
        if (existingProduct.isPresent()) {
            // Cập nhật các thuộc tính sản phẩm
            Product product = existingProduct.get();
            product.setTitle(updatedProduct.getTitle());
            product.setType(updatedProduct.getType());
            product.setReleaseDate(updatedProduct.getReleaseDate());
            product.setImage(updatedProduct.getImage());
            product.setStatus(updatedProduct.getStatus());
            product.setColor(updatedProduct.getColor());
            product.setPrice(updatedProduct.getPrice());
            product.setQuantity(updatedProduct.getQuantity());

            // Lưu sản phẩm đã cập nhật
            Product savedProduct = productService.addProduct(product);
            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
