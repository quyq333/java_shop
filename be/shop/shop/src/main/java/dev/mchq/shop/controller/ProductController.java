package dev.mchq.shop.controller;


import dev.mchq.shop.service.ProductService;
import dev.mchq.shop.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
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
    @GetMapping("/products/{id}")
    public ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable Integer id ){
        return new ResponseEntity<Optional<Product>>(productService.singleProduct(id), HttpStatus.OK);
    }
    @PostMapping("/products/create")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        return ResponseEntity.ok(productService.addProduct(product));
    }
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product updatedProduct) {
        Optional<Product> existingProduct = productService.singleProduct(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            // Cập nhật các trường
            product.setProductId(updatedProduct.getProductId());
            product.setTitle(updatedProduct.getTitle());
            product.setType(updatedProduct.getType());
            product.setDescription(updatedProduct.getDescription());
            product.setReleaseDate(updatedProduct.getReleaseDate());
            product.setPoster(updatedProduct.getPoster()); // Cập nhật ảnh poster
            product.setStatus(updatedProduct.getStatus());
            product.setColor(updatedProduct.getColor());
            product.setPrice(updatedProduct.getPrice());
            product.setQuantity(updatedProduct.getQuantity());

            // Cập nhật danh sách ảnh
            product.setImage(Arrays.asList(updatedProduct.getImage1(), updatedProduct.getImage2(), updatedProduct.getImage3()));


            productService.addProduct(product); // Lưu vào DB
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Thêm phương thức xóa sản phẩm
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        Optional<Product> existingProduct = productService.singleProduct(id);
        if (existingProduct.isPresent()) {
            productService.deleteProduct(id); // Gọi service để xóa sản phẩm
            return ResponseEntity.noContent().build(); // Trả về status 204 (No Content) khi xóa thành công
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Trả về 404 nếu không tìm thấy sản phẩm
        }
    }

}
