package lab1.dShare.D_Share.Controllers;

import lab1.dShare.D_Share.PrinterModel.PrinterService;
import lab1.dShare.D_Share.UserModel.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestApiController {

    @Autowired
    private UserService userService;

    @Autowired
    private PrinterService printerService;

}
