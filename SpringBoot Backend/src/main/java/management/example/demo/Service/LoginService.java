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

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@Service
public class LoginService implements UserService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private ExaminerRepository examinerRepository;

    private UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    //Find the user by the id
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    //Save users, overriding the save method in the user service
    @Override
    public User save(User user_) {
        // Get the roles from the user_ object if any
        Set<Role> roles = user_.getRoles();

        // If no roles are set, you can initialize with a default role, e.g., STUDENT
        if (roles == null || roles.isEmpty()) {
            roles = new HashSet<>();
            //roles.add(Role.USER);// Or set to a default role as per your application's logic
            roles.add(Role.ADMIN);
            //roles.add(Role.SUPERVISOR);
            //roles.add(Role.STUDENT);

        }

        // Create a new User object with the provided details and roles
        User user = new User(
                user_.getUsername(),
                user_.getName(),
                user_.getEmail(),
                passwordEncoder.encode(user_.getPassword()),
                roles
        );

        // Save the user to the database
        User savedUser = userRepository.save(user);

        //According to the roles, save them in the entities
        for (Role role : roles){
            switch (role) {
                case SUPERVISOR:
                    Supervisor supervisor = new Supervisor();
                    // Set supervisor-specific fields
                    //supervisor.setId(savedUser.getId());
                    supervisor.setEmail(savedUser.getEmail());
                    supervisor.setId(savedUser.getId());
//                    supervisor.setUser(savedUser); // Assume Supervisor has a reference to User
                    supervisorRepository.save(supervisor);
                    break;

                case EXAMINER:
                    Examiner examiner = new Examiner();
                    // Set examiner-specific fields
                    //examiner.setId(savedUser.getId());
                    examiner.setEmail(savedUser.getEmail());
                    examiner.setId(savedUser.getId());
                    //examiner.setUser(savedUser); // Assume Supervisor has a reference to User
                    examinerRepository.save(examiner);
                    break;

            default:
                break;
        }}

        //Save user in the database through the repository layer
        return userRepository.save(user);
    }


}





































 /*
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found.");
        }
        org.springframework.security.core.userdetails.User.UserBuilder builder =
                org.springframework.security.core.userdetails.User.withUsername(user.getUsername());
        builder.password(user.getPwd());
        builder.roles("STUDENT");

        UserDetails userDetails = builder.build();
        System.out.println("UserDetails: " + userDetails);
        return userDetails;
    }*/