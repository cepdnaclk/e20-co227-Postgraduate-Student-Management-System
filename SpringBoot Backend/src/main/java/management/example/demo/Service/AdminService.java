package management.example.demo.Service;


import management.example.demo.Model.Examiner;
import management.example.demo.Model.Supervisor;
import management.example.demo.Model.User;
import management.example.demo.Repository.ExaminerRepository;
import management.example.demo.Repository.SupervisorRepository;
import management.example.demo.Repository.UserRepository;
import management.example.demo.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AdminService {

    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private ExaminerRepository examinerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public User addStaff(String name, String email, Set<Role> roles) throws Exception{

        // Create a new User object with the provided details and roles
        User user = new User(
                name,
                name,
                email,
                passwordEncoder.encode(email),
                roles
        );

        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Add user to specific role entities based on the roles
        //According to the roles, save them in the entities
        for (Role role : roles){
            switch (role) {
                case SUPERVISOR:
                    Supervisor supervisor = new Supervisor();
                    // Set supervisor-specific fields
                    supervisor.setId(savedUser.getId());
                    supervisor.setEmail(savedUser.getEmail());
                    supervisor.setId(savedUser.getId());
                    supervisor.setFullName(savedUser.getName());
//                    supervisor.setUser(savedUser); // Assume Supervisor has a reference to User
                    supervisorRepository.save(supervisor);
                    break;

                case EXAMINER:
                    Examiner examiner = new Examiner();
                    // Set examiner-specific fields
                    examiner.setId(savedUser.getId());
                    examiner.setEmail(savedUser.getEmail());
                    examiner.setId(savedUser.getId());
                    examiner.setFullName(savedUser.getName());
                    //examiner.setUser(savedUser); // Assume Supervisor has a reference to User
                    examinerRepository.save(examiner);
                    break;

                default:
                    break;
            }
        }

        //Set the details to the send the email
        String toEmail = user.getEmail();
        String subject = "Assign as a Staff Member";
        String body = "You have assigned as "+ roles +" successfully confirmed." + "\n" +
                "Your username = " + name + "\n" +
                "Your password = " + email;

        //Send the email
        //emailService.sendMail(toEmail, subject, body);
        //Send email with the attachment of application
        emailService.sendMail(toEmail, subject, body);

        return savedUser;
    }

    //Check the staff members and load their data if he is in the database
    public Optional<User> loadStaffMember(String email){
        return userRepository.findByEmail(email);
    }
}