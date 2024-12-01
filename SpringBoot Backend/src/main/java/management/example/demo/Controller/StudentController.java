package management.example.demo.Controller;

import jakarta.mail.MessagingException;
import management.example.demo.Model.EducationalQualification;
import management.example.demo.Model.FileMetadata;
import management.example.demo.Model.Student;
import management.example.demo.Model.User;
import management.example.demo.Repository.UserRepository;
import management.example.demo.Service.EmailService;
import management.example.demo.Service.FileService;
import management.example.demo.Service.NotificationService;
import management.example.demo.Service.StudentService;
import management.example.demo.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private FileService fileUploadService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/enroll")
    public String showEnrollmentForm() {
        return "enroll";  // enroll.html should be your form page
    }

    @PostMapping("/enroll")
    public ResponseEntity<Map<String, String>> enrollStudent(
            @RequestPart("student") Student student,
            @RequestParam("attachments") List<MultipartFile> attachments,
            @RequestPart("studentIdDocument") MultipartFile studentIdDocument,
            @RequestPart("birthCertificate") MultipartFile birthCertificate) throws MessagingException {

        System.out.println("Received student data: " + student);

        // Validate educational qualifications
        List<EducationalQualification> qualifications = student.getEducationalQualifications();
        if (qualifications == null || qualifications.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Educational qualifications must not be null or empty"));
        }

        // Validate attachments count
        if (attachments.size() < qualifications.size()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Not enough attachments provided for the qualifications"));
        }

        // Iterate over each qualification and its corresponding attachments
        for (int i = 0; i < qualifications.size(); i++) {
            EducationalQualification qualification = qualifications.get(i);
            MultipartFile attachment = attachments.get(i);

            // Initialize list to hold attachments for the qualification
            List<FileMetadata> qualificationAttachments = new ArrayList<>();

            if (!attachment.isEmpty()) {
                try {
                    // Upload the attachment and retrieve metadata
                    FileMetadata fileMetadata = fileUploadService.uploadFileAndReturnFileMetadata(attachment);
                    qualificationAttachments.add(fileMetadata);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Map.of("error", "Failed to upload attachments. Please try again."));
                }
            }

            // Set the uploaded attachments to the qualification
            qualification.setAttachments(qualificationAttachments);

            // Associate the qualification with the student
            qualification.setStudent(student);
        }

        // Handle Student ID Document
        if (!studentIdDocument.isEmpty()) {
            List<String> idDocData = fileUploadService.uploadFile(studentIdDocument);
            student.setStudentIdDocument(idDocData.get(0)); // File path
            student.setStudentIdDocumentOriginalName(idDocData.get(1)); // Original filename
        }

        // Handle Birth Certificate
        if (!birthCertificate.isEmpty()) {
            List<String> birthCertData = fileUploadService.uploadFile(birthCertificate);
            student.setBirthCertificate(birthCertData.get(0)); // File path
            student.setBirthCertificateOriginalName(birthCertData.get(1)); // Original filename
        }

        // Save the student with the associated qualifications and attachments
        studentService.saveStudent(student);

        // Find the admin user by role
        Role adminRole = Role.ADMIN;  // Assuming you have an enum for roles
        Optional<User> adminUserOptional = userRepository.findByRolesContaining(adminRole);

        if (adminUserOptional.isPresent()) {
            User adminUser = adminUserOptional.get();

            // Get admin email and username
            String adminEmail = adminUser.getEmail();
            String adminUsername = adminUser.getUsername();

            // Send an email notification to the admin
            String templateName = "Enrollment Notification";
            Map<String, Object> variables = new HashMap<>();
            variables.put("studentName", student.getFullName());
            emailService.sendEmail(templateName, variables, adminEmail);

            // Send a notification to the admin user
            String subject = "New Student Enrollment";
            String body = "A new student has enrolled: " + student.getFullName();
            notificationService.sendNotification(adminUser, subject, body);
        } else {
            // Handle case where no admin user is found
            System.out.println("Admin user not found.");
        }


        Map<String, String> response = new HashMap<>();
        response.put("message", "Student enrolled successfully!");
        return ResponseEntity.ok(response);
    }
}

//    @PostMapping("/enroll")
//    public ResponseEntity<Map<String, String>> enrollStudent(
//            @ModelAttribute Student student,
//            @RequestParam("attachment") MultipartFile attachment) throws MessagingException {
//
//        // Handle file upload
//
//        List<String> attachemntData = new ArrayList<>();
//        if (!attachment.isEmpty()) {
//            attachemntData = fileUploadService.uploadFile(attachment);
//            student.setAttachementFile(attachemntData.get(0));
//            student.setAttachementFileOriginalName(attachemntData.get(1));
//        }
//
//        // Save the enrolled student
//        studentService.saveStudent(student);
//
//        // Email the administrator to inform the enrollment
//        String toEmail = "dasunikawya2001.1@gmail.com";
//        String subject = "A student Enrollment";
//        String body = "New student has enrolled. \n" +
//                "Name : " + student.getFullName() + "\n" +
//                "Address : " + student.getAddress() + "\n";
//        emailService.sendMail(toEmail, subject, body);
//        //Replace this with the ADMIN USERNAME
//        User user = userRepository.findByUsername("e20500");
//        notificationService.sendNotification(user, subject, body);
//
//        System.out.println("Successfully enrolled.");
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "Student enrolled successfully!");
//        return ResponseEntity.ok(response);
//    }
