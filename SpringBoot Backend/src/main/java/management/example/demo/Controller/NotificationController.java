package management.example.demo.Controller;

import management.example.demo.Model.Notification;
import management.example.demo.Model.User;
import management.example.demo.Repository.UserRepository;
import management.example.demo.Service.NotificationService;
import management.example.demo.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications(@RequestHeader ("Authorization") String token){
        String jwtToken = token.substring(7);
        String username = jwtUtil.extractUsername(jwtToken);
        User user = userRepository.findByUsername(username);
        return notificationService.getUnreadNotifications(user);
    }

    @GetMapping("/forPage")
    public List<Notification> getUnreadNotificationsForPage(@RequestHeader ("Authorization") String token){
        String jwtToken = token.substring(7);
        String username = jwtUtil.extractUsername(jwtToken);
        User user = userRepository.findByUsername(username);
        return notificationService.getUnreadNotificationsForNotificationPage(user);
    }

    @GetMapping("/unread/count")
    public Long getUnreadNotificationCount(@RequestHeader ("Authorization") String token){
        String jwtToken = token.substring(7);
        String username = jwtUtil.extractUsername(jwtToken);
        User user = userRepository.findByUsername(username);
        return notificationService.getUnreadNotificationCount(user);
    }


    public ResponseEntity<?> getUnreadNotifications(Principal principal) {
        if (principal == null) {
            System.out.println("Principal is null, user is not authenticated.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        User user = userRepository.findByUsername(principal.getName());
        List<Notification> notifications = notificationService.getUnreadNotifications(user);

        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/markAsRead")
    public void markAsRead(@RequestBody List<Long> notificationIds) {
        notificationService.markAsRead(notificationIds);
    }

    @PutMapping("/markAsRead/{notificationId}")
    public void markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsReadEachNotification(notificationId);
    }

}
