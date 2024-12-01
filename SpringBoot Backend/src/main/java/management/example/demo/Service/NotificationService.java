package management.example.demo.Service;

import management.example.demo.Model.Notification;
import management.example.demo.Model.User;
import management.example.demo.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Transactional
    public void sendNotification(User user, String title, String message) {
        try {
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setTimestamp(LocalDateTime.now());
            notification.setRead(false);

            // Save the notification to the database
            notificationRepository.save(notification);

            // Convert the notification to a DTO or just send it as is if it's simple
            //NotificationDTO notificationDTO = new NotificationDTO(notification.getTitle(), notification.getMessage(), notification.getTimestamp());

            // Send notification via WebSocket
            messagingTemplate.convertAndSendToUser(user.getUsername(), "/topic/notifications", notification);
        } catch (Exception e) {
            // Handle exception (e.g., log the error)
            System.err.println("Error sending notification: " + e.getMessage());
        }
    }


    public List<Notification> getUnreadNotifications(User user) {
        return notificationRepository.findByUserIdAndReadFalse(user.getId());
    }

    public List<Notification> getUnreadNotificationsForNotificationPage(User user) {
        return notificationRepository.findByUserId(user.getId());
    }


    // New method to get the count of unread notifications
    public long getUnreadNotificationCount(User user) {
        return notificationRepository.countByUserIdAndReadFalse(user.getId());
    }

    @Transactional
    public void markAsRead(List<Long> notificationIds) {
        notificationRepository.findAllById(notificationIds).forEach(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }

    @Transactional
    public void markAsReadEachNotification(Long notificationId) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }
}
