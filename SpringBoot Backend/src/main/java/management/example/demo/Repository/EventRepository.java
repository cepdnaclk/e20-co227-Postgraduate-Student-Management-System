package management.example.demo.Repository;

import management.example.demo.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository <Event, Long> {
    List<Event> findByUser_Username(String username);
}
