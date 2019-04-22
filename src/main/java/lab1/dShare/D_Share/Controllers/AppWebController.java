package lab1.dShare.D_Share.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AppWebController {
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String redirectToGamesPage () { return "redirect:/login.html"; }
}
