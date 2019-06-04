package lab1.dShare.D_Share.OrderModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/client/{id}")
    public Set<Order> getClientOrders(@PathVariable long id){
        return orderService.getClientOrders(id);
    }

    @GetMapping("/producer/{id}")
    public Set<Order> getProducerOrders(@PathVariable long id){
        return orderService.getProducerOrders(id);
    }

    @GetMapping("{id}")
    public Order getOrder(@PathVariable Long id){
        return orderService.getOrder(id);
    }

    @PostMapping("/add")
    public void addOrder(@RequestBody Order order){
        orderService.addOrder(order);
    }

    @PutMapping("/delete/{id}")
    public void deleteOrder(@PathVariable Long id){
        orderService.deleteOrder(id);
    }

    @PostMapping("/request/accept/{id}")
    public void acceptRequest(@PathVariable long id){
        orderService.acceptRequest(id);
    }

    @PostMapping("/request/reject/{id}")
    public void rejectRequest(@PathVariable long id){
        orderService.deleteOrder(id);
    }

    @PostMapping("/status/{id}")
    public void updateStatus(@PathVariable long id, @RequestParam int status){
        orderService.updateStatus(id, status);
    }
}
