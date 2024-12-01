package management.example.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashBoardController {

    //Show dashboard
    @GetMapping("/dashboard")
    public String showDashBoard(Model model){
        return "dashboard";
    }
}
