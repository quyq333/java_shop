package dev.mchq.shop.controller;

import dev.mchq.shop.entity.Order;
import dev.mchq.shop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/v1")
@CrossOrigin(origins = "*") // Cho phép React gọi API
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/orders")
    public Order createOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }
}
