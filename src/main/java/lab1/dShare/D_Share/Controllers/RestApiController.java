package lab1.dShare.D_Share.Controllers;

import lab1.dShare.D_Share.PrinterModel.PrinterService;
import lab1.dShare.D_Share.UserModel.User;
import lab1.dShare.D_Share.UserModel.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class RestApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private PrinterService printerService;

    @PostMapping("/user")
    public ResponseEntity<Object> addUser(@RequestBody User user){
        try {
            userService.addUser(user);
        }catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
