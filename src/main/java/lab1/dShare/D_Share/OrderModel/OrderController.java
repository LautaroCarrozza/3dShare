package lab1.dShare.D_Share.OrderModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

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

}
