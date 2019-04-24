package lab1.dShare.D_Share.Controllers;

import lab1.dShare.D_Share.MaterialModel.Material;
import lab1.dShare.D_Share.MaterialModel.MaterialService;
import lab1.dShare.D_Share.PrinterModel.Printer;
import lab1.dShare.D_Share.PrinterModel.PrinterService;
import lab1.dShare.D_Share.UserModel.User;
import lab1.dShare.D_Share.UserModel.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class RestApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private PrinterService printerService;

    @Autowired
    private MaterialService materialService;

    @PostMapping("/user")
    public ResponseEntity<Object> addUser(@RequestBody User user){
        try {
            userService.addUser(user);
        }catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }



    @GetMapping("/user")
    public Long getAuthUserId(Authentication authentication){
        User user = userService.getUserByName(authentication.getName());
        return user.getId();
    }

    @PostMapping("/material")
    public ResponseEntity<Object> addMaterial(@RequestBody Material material){
        try {
            materialService.addMaterial(material);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/printer")
    public ResponseEntity<Object> addPrinter(@RequestBody Printer printer){
        try {
            printerService.addPrinter(printer);
        }catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
