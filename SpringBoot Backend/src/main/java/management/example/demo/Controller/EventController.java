package management.example.demo.Controller;

import management.example.demo.Model.Event;
import management.example.demo.Service.EventService;
import management.example.demo.Service.UserService;
import management.example.demo.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/user")
public class EventController {

    @Autowired
    private EventService eventService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @GetMapping("events/{userId}")
    public List<Event> getUserEvents(@PathVariable String userId){
        return eventService.getEventsForUser(userId);
    }

    @PostMapping("/create-event")
    public Event createEvent(@RequestBody Event event, @RequestHeader("Authorization") String token){
        String jwtToken = token.substring(7);
        String username = jwtUtil.extractUsername(jwtToken);
        event.setUser(userService.findByUsername(username));
        return eventService.createEvent(event);
    }

//    @DeleteMapping("/{eventId}")
//    public void deleteEvent(@PathVariable Long eventId){
//        eventService.deleteEvent(eventId);
//    }

    @DeleteMapping("/delete-event/{eventId}")
    public void deleteEvent(@PathVariable Long eventId){
        eventService.deleteEvent(eventId);
    }

}
