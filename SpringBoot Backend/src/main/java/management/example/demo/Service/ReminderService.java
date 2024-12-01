package management.example.demo.Service;

import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.Submission;
import management.example.demo.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.Date;
import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private ConfirmedStudentService confirmedStudentService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;
    @Autowired
    private NotificationService notificationService;

    // Run the task every day at 12 AM
    @Scheduled(cron = "0 0 0 * * ?")
    public void sendDeadlineReminders() {
        List<Submission> submissions = submissionService.findAll(); // Implement this method to fetch all submissions

        for (Submission submission : submissions) {
            LocalDateTime deadline = submission.getDeadline();

            if (deadline != null) {
                LocalDateTime now = LocalDateTime.now();

                // Calculate one month and one week before the deadline
                LocalDateTime oneMonthBefore = deadline.minusMonths(1);
                LocalDateTime oneWeekBefore = deadline.minusWeeks(1);
                LocalDateTime oneDayBefore = deadline.minusDays(1);
                LocalDateTime oneHourBefore = deadline.minusHours(1);

                // Check if today is one month or one week before the deadline
                if (now.isAfter(oneMonthBefore) && now.isBefore(oneMonthBefore.plusDays(1))) {
                    sendReminderEmail(submission, "1 Month");
                } else if (now.isAfter(oneWeekBefore) && now.isBefore(oneWeekBefore.plusDays(1))) {
                    sendReminderEmail(submission, "1 Week");
                } else if (now.isAfter(oneDayBefore) && now.isBefore(oneDayBefore.plusDays(1))) {
                    sendReminderEmail(submission, "1 Day");
                }else if (now.isAfter(oneHourBefore) && now.isBefore(deadline)) {
                    sendReminderEmail(submission, "1 Hour");
                }
            }
        }
    }

    private void sendReminderEmail(Submission submission, String timeFrame) {
        //Generate the email for the student
        ConfirmedStudent confirmedStudent = submission.getConfirmedStudent();
        String toEmail = confirmedStudent.getEmail();
        String subject = "Reminder: " + timeFrame + " Until Deadline for Submission";
        String body = String.format(
                "This is a reminder that your progress report submission deadline is approaching.\n\n" +
                        "Deadline: %s\n\n" +
                        "Please ensure that your reports are submitted on time. " +
                        "If you have any questions or need further clarification, please don't hesitate to reach out to your supervisor.\n\n" ,
                submission.getDeadline()
        );
        emailService.sendMail(toEmail, subject, body);

        // Send in-app notification for students
        User user = userService.findByUsername(confirmedStudent.getRegNumber());
        notificationService.sendNotification(user, subject, body);

        //Generate the email for the supervisors
    }

    // Run the task every day at 12 AM
    @Scheduled(cron = "0 0 0 * * ?")
    public void sendRegistrationReminders() {
        List<ConfirmedStudent> students = confirmedStudentService.listAll(); // Implement this method to fetch all registered students

        for (ConfirmedStudent student : students) {
            Date registrationDate = student.getRegisteredDate();  // Ensure registration date is stored
            LocalDateTime now = LocalDateTime.now();

            long monthsSinceRegistration = ChronoUnit.MONTHS.between((Temporal) registrationDate, now);

            // Check for specific intervals: 5, 11, 17, 23 months
            if (monthsSinceRegistration == 5) {
                sendReminder(student, "5 Months");
            } else if (monthsSinceRegistration == 11) {
                sendReminder(student, "11 Months");
            } else if (monthsSinceRegistration == 17) {
                sendReminder(student, "17 Months");
            } else if (monthsSinceRegistration == 23) {
                sendReminder(student, "23 Months");
            }
            // Continue for additional intervals as needed
        }
    }


    private void sendReminder(ConfirmedStudent student, String timeFrame) {
        // Generate the email content
        String toEmail = student.getEmail();
        String subject = "Reminder: " + timeFrame + " Since Registration";
        String body = String.format(
                "This is a reminder that %s have passed since your registration. " +
                        "Please review your progress and contact your supervisor if needed.\n\n",
                timeFrame
        );
        emailService.sendMail(toEmail, subject, body);

        // Send in-app notification
        User user = userService.findByUsername(student.getRegNumber());
        notificationService.sendNotification(user, subject, body);
    }
}

