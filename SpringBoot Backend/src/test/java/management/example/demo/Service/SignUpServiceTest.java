//package management.example.demo.Service;
//
//import management.example.demo.Model.User;
//import management.example.demo.Repository.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class SignUpServiceTest {
//
//    @Mock
//    //This annotation create the mock object - userRepository
//    private UserRepository userRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @InjectMocks
//    //This annotation will inject the mock objects into the services
//    //Here userRepository and passwordEncoder will inject into the signUpService
//    private SignUpService signUpService;
//
//    @BeforeEach
//    //This annotation sets the mock objects before each test staring.
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void save_ShouldEncodePassword_AndSaveUser() {
//        //Creating a User object
//        User user = new User();
//        user.setUsername("testuser");
//        user.setPwd("password");
//
//        //Stubbing the behavior of the userRepository and the passwordEncoder
//        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
//        when(userRepository.save(any(User.class))).thenReturn(user);
//
//        //Set the password into encoded string and save the user
//        user.setPwd(passwordEncoder.encode(user.getPwd()));
//        User savedUser = signUpService.save(user);
//
//        //Assertions
//        assertNotNull(savedUser);
//        assertEquals("encodedPassword", savedUser.getPwd());
//
//        //Verify the method is calling exactly one time
//        verify(userRepository, times(1)).save(user);
//    }
//}
