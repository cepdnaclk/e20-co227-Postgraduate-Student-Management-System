package management.example.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WelcomeController {

    //Show welcome page
    @GetMapping("/welcome")
    public String showHomePage(){
        return "welcome";
    }

}
