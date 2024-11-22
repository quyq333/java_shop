package dev.mchq.shop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Product {
    @Id
    private ObjectId id;

    private String productId;

    private String title;

    private String type;

    private String description;

    private String releaseDate;

    private String poster;

    private String status;

    private String color;

    private Integer price;

    private List<String> image;

    private Integer quantity;

}




