package lab1.dShare.D_Share.OrderModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {

    public static final String[] EVERYSTATUS = {"Pendiente de aceptacion", "En proceso", "En produccion", "En trafico", "Entregado"};

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
        return orderRepository.findAllByClientId(id);
    }

    public Set<Order> getProducerOrders(long id) {
        return orderRepository.getByProducerId(id);
    }

    public void acceptRequest(long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order!= null) {
            order.setInProgress(true);
            order.setStatus(EVERYSTATUS[1]);
            //updates it
            orderRepository.save(order);
        }
        else throw new NoSuchElementException("Order is null");
    }

    public void updateStatus(long id, int status) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) throw new NoSuchElementException("Order is null");

        order.setStatus(EVERYSTATUS[status]);
        //updates it
        orderRepository.save(order);
    }
}
