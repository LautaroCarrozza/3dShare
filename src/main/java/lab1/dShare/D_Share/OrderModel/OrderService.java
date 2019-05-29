package lab1.dShare.D_Share.OrderModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order getOrder(Long id){
        return orderRepository.findById(id).orElse(null);
    }

    public void addOrder(Order order){
        orderRepository.save(order);
    }

    public void deleteOrder(Long id){
        orderRepository.deleteById(id);
    }

    public Set<Order> getClientOrders(long id) {
        return orderRepository.findAllByClientIdAndInProgressTrue(id);
    }

    public Set<Order> getProducerOrders(long id) {
        return orderRepository.getByProducerId(id);
    }
}
