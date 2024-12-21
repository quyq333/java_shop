package dev.mchq.shop.service;

import dev.mchq.shop.entity.Order;
import dev.mchq.shop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
// lấy danh sách đơn hang
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    // Cập nhật trạng thái đơn hàng thành "Hủy"
    public Order cancelOrder(String orderId) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus("Hủy");  // Thay đổi trạng thái thành "Hủy"
            return orderRepository.save(order);  // Lưu lại đơn hàng đã được cập nhật
        }
        return null;  // Nếu không tìm thấy đơn hàng
    }
}

