package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.MaterialModel.Material;
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

    //All..
    @GetMapping()
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public User getUser(@PathVariable Long id){
        return userService.getUser(id);
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

}
