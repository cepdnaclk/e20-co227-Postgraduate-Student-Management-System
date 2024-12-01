package management.example.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    //Show home page
    @GetMapping("/home")
    public String showHomePage(Model model){
        return "home";
    }
}
