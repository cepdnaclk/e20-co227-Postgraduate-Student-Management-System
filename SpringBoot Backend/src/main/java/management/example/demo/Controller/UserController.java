package management.example.demo.Controller;

import management.example.demo.Model.User;
import management.example.demo.Service.UserService;
import management.example.demo.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @GetMapping("/username")
    public String getUsername(@RequestHeader("Authorization") String token) {
        // Remove "Bearer " prefix
        String jwtToken = token.substring(7);
        String username = jwtUtil.extractUsername(jwtToken);
        System.out.println(username);
        return username;
    }

    @GetMapping("/profile-user")
    public Optional<User> loadUserData(@RequestHeader("Authorization") String token){
        String jwtToken = token.substring(7);
        String username = jwtUtil.extractUsername(jwtToken);
        Long userId = jwtUtil.extractUserId(jwtToken);
        return userService.findById(userId);
    }
}
