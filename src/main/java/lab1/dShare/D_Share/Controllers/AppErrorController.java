package lab1.dShare.D_Share.Controllers;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppErrorController implements ErrorController {

    private final static String ERROR_PATH = "/error";

    @Override
    @RequestMapping(ERROR_PATH)
    public String getErrorPath() {
        return "redirect:/login.html";
    }


}
