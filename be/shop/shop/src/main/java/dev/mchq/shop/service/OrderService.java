package dev.mchq.shop.service;

import dev.mchq.shop.entity.Order;
import dev.mchq.shop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}

