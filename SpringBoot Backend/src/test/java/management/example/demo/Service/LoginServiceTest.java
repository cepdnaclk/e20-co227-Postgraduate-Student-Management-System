package management.example.demo.Service;

import management.example.demo.Model.User;
import management.example.demo.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LoginServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LoginService loginService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
//    public void loadUserByUsername_ShouldReturnUserDetails() {
//        User user = new User();
//        user.setUsername("testuser");
//        user.setPassword("$2a$10$DowJonesX/GM.8FqEFCMmiOeE7p7VuwxI");
//
//        when(userRepository.findByUsername("testuser")).thenReturn(user);
//
//        UserDetails userDetails = (UserDetails) loginService.findByUsername("testuser");
//
//        assertNotNull(userDetails);
//        assertEquals("testuser", userDetails.getUsername());
//        assertEquals(user.getPassword(), userDetails.getPassword());
//    }
//
//    @Test
//    public void loadUserByUsername_ShouldThrowException_WhenUserNotFound() {
//        when(userRepository.findByUsername("unknownuser")).thenReturn(null);
//
//        assertThrows(UsernameNotFoundException.class, () -> {
//            loginService.findByUsername("unknownuser");
//        });
//    }
}
