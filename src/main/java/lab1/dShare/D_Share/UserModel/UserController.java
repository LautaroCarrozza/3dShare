package lab1.dShare.D_Share.UserModel;

import lab1.dShare.D_Share.PrinterModel.Printer;
import lab1.dShare.D_Share.PrinterModel.PrinterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final String COSTUMERDIRECTION = "/customer";
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
}
