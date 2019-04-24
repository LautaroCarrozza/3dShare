package lab1.dShare.D_Share.Controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AppWebController {
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String redirectToLoginPage () {
        return "redirect:/login.html";
    }

//    @RequestMapping(path = "/home.html/**", method = RequestMethod.GET)
//    public String redirectToLoginPage (Authentication authentication) {
//        if (authentication == null || authentication.getName().equals("anonymousUser"))
//            return "redirect:/login.html";
//        return null;
//    }

}
