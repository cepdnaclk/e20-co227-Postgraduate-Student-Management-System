package management.example.demo.Controller;


import management.example.demo.Model.User;
import management.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


//@Controller
@RestController
public class SignUpController {

    @Autowired
    private UserDetailsService userDetailsService;

    private UserService userService;

    public SignUpController(UserService userService) {
        this.userService = userService;
    }

    //Show sigh up page
    @GetMapping("/signup")
    public String register(Model model, User user) {
        model.addAttribute("user", user);
        return "signup";
    }


//    @PostMapping("/signup")
//    public String registerSava(@ModelAttribute("user") User user_, Model model) {
//        User user = userService.findByUsername(user_.getUsername());
//        if (user != null) {
//            model.addAttribute("Userexist", user);
//            return "signup";
//        }
//        userService.save(user_);
//        return "redirect:/login";
//    }

    //Save the users in the user entity by calling user service
    @PostMapping("/signup")
    public ResponseEntity<?> registerSave(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser != null) {
            return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
        }
        userService.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
}

//NOTES
/*
What @RequestBody Does
When a client (like a frontend application) sends an HTTP POST request to a Spring Boot backend,
it often includes data in the request body. This data is typically in JSON format, especially in
modern web applications that use RESTful APIs. The @RequestBody annotation tells Spring to take
this JSON data from the body of the HTTP request and convert (or "map") it into a corresponding Java object.

**JSON
{
  "username": "e20100",
  "firstName": "Dasuni",
  "lastName": "Kawya",
  "email": "dasuni@gmail.com",
  "password": "12345678"
}

**'User' object
public class User {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // Getters and setters omitted for brevity
}
 */