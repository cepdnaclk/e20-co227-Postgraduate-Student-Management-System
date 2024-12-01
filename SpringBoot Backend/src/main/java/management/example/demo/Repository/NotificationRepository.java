package management.example.demo.Repository;

import management.example.demo.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdAndReadFalse(Long userId);

    List<Notification> findByUserId(Long userId);

    Optional<Notification> findById(Long id);

    //Method to get the count of unread notifications
    long countByUserIdAndReadFalse(Long userId);
}
