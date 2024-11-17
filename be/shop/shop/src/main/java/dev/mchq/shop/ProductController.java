package dev.mchq.shop;

import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<List<Product>>(productService.allProducts(), HttpStatus.OK);

    }
    @GetMapping("/{productId}")
    public ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable String productId ){
        return new ResponseEntity<Optional<Product>>(productService.singleProduct(productId), HttpStatus.OK);

    }
}
