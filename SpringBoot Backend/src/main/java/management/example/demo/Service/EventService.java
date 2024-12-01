package management.example.demo.Service;

import management.example.demo.Model.Event;
import management.example.demo.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    //To list all the events related to a particular user
    public List<Event> getEventsForUser(String userId){
        return eventRepository.findByUser_Username(userId);
    }

    //To create an event
    public Event createEvent(Event event){
        return eventRepository.save(event);
    }

    //To delete an event
    public void deleteEvent(Long eventId){
        eventRepository.deleteById(eventId);
    }
}

//import management.example.demo.Model.Event;
//import management.example.demo.Repository.EventRepository;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class EventService {
//
//    private final EventRepository eventRepository;
//    private final SimpMessagingTemplate messagingTemplate;
//
//
//
//    public EventService(EventRepository eventRepository, SimpMessagingTemplate messagingTemplate) {
//        this.eventRepository = eventRepository;
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    //To list all the events related to a particular user
//    // Method to list all events for a specific user
//    public List<Event> getEventsForUser(String username) {
//        return eventRepository.findByUser_Username(username);
//    }
//
//    public Event createEvent(Event event) {
//        Event savedEvent = eventRepository.save(event);
//        messagingTemplate.convertAndSend("/topic/events", savedEvent);
//        return savedEvent;
//    }
//
//    public void deleteEvent(Long eventId) {
//        eventRepository.deleteById(eventId);
//        messagingTemplate.convertAndSend("/topic/events", "Event deleted: " + eventId);
//    }
//}

