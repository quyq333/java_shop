package dev.mchq.shop.controller;

import dev.mchq.shop.entity.Order;
import dev.mchq.shop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/v1")
@CrossOrigin(origins = "*") // Cho phép React gọi API
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        if (order.getUserId() == null || order.getUserId().isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Xử lý nếu thiếu userId
        }
        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    // Lấy danh sách đơn hàng
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    // Lấy đơn hàng theo userId
    @GetMapping("/orders/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable String userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);  // Dùng service thay vì trực tiếp gọi repository
        return ResponseEntity.ok(orders);
    }

    // Cập nhật trạng thái đơn hàng thành "Hủy"
    @PutMapping("/orders/cancel/{orderId}")
    public ResponseEntity<Order> cancelOrder(@PathVariable String orderId) {
        Order order = orderService.cancelOrder(orderId);
        if (order != null) {
            return ResponseEntity.ok(order);  // Trả về đơn hàng đã được cập nhật trạng thái
        }
        return ResponseEntity.notFound().build();  // Trường hợp không tìm thấy đơn hàng
    }
}
