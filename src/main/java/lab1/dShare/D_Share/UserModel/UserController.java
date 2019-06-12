package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.MaterialModel.Material;
import lab1.dShare.D_Share.OrderModel.Order;
import lab1.dShare.D_Share.OrderModel.OrderService;
import lab1.dShare.D_Share.PrinterModel.Printer;
import lab1.dShare.D_Share.PrinterModel.PrinterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final String CUSTOMERDIRECTION = "/customer";
    private static final String PRODUCERDIRECTION = "/producer";

    @Autowired
    private UserService userService;

    @Autowired
    private PrinterService printerService;

    @Autowired
    private OrderService orderService;

    //All..
    @GetMapping()
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public User getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @GetMapping("/getName/{id}")
    public String getUserName(@PathVariable Long id){
        return userService.getUser(id).getName();
    }

    @PostMapping("/addOrder/client/{clientId}/producer/{producerId}")
    public ResponseEntity<Object> addOrder(@PathVariable long clientId, @PathVariable long producerId,
                                           @RequestParam String materialName, @RequestParam String printerName,
                                           Authentication authentication){
        User clientUser = userService.getUser(clientId);
        User producerUser = userService.getUser(producerId);

        if (authentication == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        if (clientUser == null || producerUser == null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        Order order = new Order(clientUser, producerUser, materialName, printerName);
        userService.addOrder(order, clientUser, producerUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    //Customers part...
    /*
    aca va :
        cargar diseno
        buscar productores
        etc..
     */
    @GetMapping(CUSTOMERDIRECTION + "/getProducers")
    public Set<User> getProducers(){
        //return userService.getProducersByPrinters(printerService.getAllPrinters());
        Set<Printer> printers = printerService.getAllPrinters();
        Set<User> users = new HashSet<>();
        for (Printer printer : printers) {
            users.add(printer.getOwner());
        }
        return users;
    }

    @PostMapping(CUSTOMERDIRECTION + "/{producerId}/order/{orderId}")
    public void rateProducer(@PathVariable long producerId, @PathVariable long orderId, @RequestParam int rate){

        int totalRating = userService.getUser(producerId).getTotalProducerRating();
        double actualRating = userService.getUser(producerId).getProducerRating();
        int newTotalRating = totalRating + 1;

        double newRating = ((actualRating * totalRating) + rate)/newTotalRating;

        User user = userService.getUser(producerId);
        user.setProducerRating(newRating);
        user.setTotalProducerRating(newTotalRating);

        //updates it..
        userService.updateUser(user);

        Order order = orderService.getOrder(orderId);
        order.setStatus(OrderService.EVERYSTATUS[5]);

        //updates it..
        orderService.addOrder(order);

    }

//    @PostMapping(CUSTOMERDIRECTION + "/rateProducer/{id}")
//    public ResponseEntity<Object> updateProducerRating(@PathVariable long id, @RequestParam int rating){
//
//    }


    //Producer part...
    @PostMapping(PRODUCERDIRECTION + "/{id}/addPrinter")
    public ResponseEntity<Object> addPrinter(@PathVariable long id, @RequestParam String model, Authentication authentication){
        if (authentication == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        User user = userService.getUser(id);
        if (user == null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        Printer printer = new Printer(model, user);
        userService.addPrinter(printer, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(PRODUCERDIRECTION + "/{id}/addMaterial")
    public ResponseEntity<Object> addMaterial(@PathVariable long id, @RequestParam String name, Authentication authentication){
        User user = userService.getUser(id);

        if (authentication == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        if (user == null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        Material material = new Material(name, user);
        userService.addMaterial(material, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping (PRODUCERDIRECTION+"{id}/addCustomerRating")
    public ResponseEntity<Object> addCustomerRating(@PathVariable long id,@RequestParam double rating){
        userService.addRatingCustomer(rating,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(PRODUCERDIRECTION+"{id}/addProducerRating")
    public ResponseEntity<Object> addProducerRating(@PathVariable long id, @RequestParam double rating){
        userService.addRatingProducer(rating,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(PRODUCERDIRECTION + "/{clientId}/order/{orderId}")
    public void rateClient(@PathVariable long clientId, @PathVariable long orderId, @RequestParam int rate){

        int totalRating = userService.getUser(clientId).getTotalCustomerRating();
        double actualRating = userService.getUser(clientId).getCustomerRating();
        int newTotalRating = totalRating + 1;

        double newRating = ((actualRating * totalRating) + rate)/newTotalRating;

        User user = userService.getUser(clientId);
        user.setCustomerRating(newRating);
        user.setTotalCustomerRating(newTotalRating);

        //updates it..
        userService.updateUser(user);

        Order order = orderService.getOrder(orderId);
        orderService.deleteOrder(orderId);

    }


}
