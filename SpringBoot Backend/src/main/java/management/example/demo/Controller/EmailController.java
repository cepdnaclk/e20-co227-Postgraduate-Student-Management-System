package management.example.demo.Controller;

import jakarta.mail.MessagingException;
import management.example.demo.Model.EmailTemplate;
import management.example.demo.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/emails")
public class EmailController {

    @Autowired
    private EmailService emailService;

    //Send the email
    @GetMapping("/send-email")
    public String sendEmail(@RequestParam String toEmail, @RequestParam String subject, @RequestParam String body) {
        emailService.sendMail(toEmail, subject, body);
        return "Email sent successfully!";
    }

//    @GetMapping
//    public List<EmailTemplate> getAllTemplates() {
//        return emailService.getAllTemplates();
//    }

    //All the default templates' userId has to be admin's id
    //To do
    @GetMapping("/forAdmin/{userId}")
    public List<EmailTemplate> getAllTemplatesForAdminEdit(@PathVariable Long userId) {
        return emailService.getAllTemplatesForAdminAndDefaults(userId);
    }

    @GetMapping("/forUser/{userId}")
    public List<EmailTemplate> getAllTemplatesForUserId(@PathVariable Long userId) {
        return emailService.getTemplatesUserId(userId);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public EmailTemplate updateTemplate(@PathVariable Long id, @RequestBody EmailTemplate templateDetails) throws Exception {
        return emailService.updateTemplate(id, templateDetails);
    }

    @PostMapping("/new")
    public EmailTemplate addNewTemplate(@RequestBody EmailTemplate emailTemplate){
        return emailService.addNewTemplate(emailTemplate);
    }


    @PostMapping("/send")
    public ResponseEntity<?> sendEmailWithGivenDetails(@RequestBody Map<String, Object> payload) throws MessagingException {
        System.out.println("Received payload: " + payload);  // Debugging log
        emailService.sendEmailWithGivenDetails(payload);
        System.out.println("Emails sent");
        return ResponseEntity.ok("Emails sent successfully.");
    }


}
