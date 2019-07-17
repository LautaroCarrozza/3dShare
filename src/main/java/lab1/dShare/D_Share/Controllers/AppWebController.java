package lab1.dShare.D_Share.Controllers;

import lab1.dShare.D_Share.UserModel.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AppWebController {

    @Autowired
    private UserService userService;

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String redirectToLoginPage () {
        return "redirect:/login.html";
    }

//    @RequestMapping(path = "/home-admin.html", method = RequestMethod.GET)
//    public String redirect(Authentication authentication){
//        if (authentication == null)
//            return "redirect:/login.html";
//        else if (!userService.getUserByName(authentication.getName()).isAdmin()){
//            return "redirect:/home.html";
//        }
//        else return "";
//    }
    @RequestMapping(path = "/home-admin.html")
    public ResponseEntity<Object> redirect(Authentication authentication){
        if (authentication == null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        else if (!userService.getUserByName(authentication.getName()).isAdmin()){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        else return new ResponseEntity<>(HttpStatus.CONTINUE);
    }

}
