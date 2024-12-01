package management.example.demo.config;

import management.example.demo.Model.User;
import management.example.demo.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        userRepository.deleteAll();
        User user = new User();
        user.setUsername("testuser");
        user.setPassword(passwordEncoder.encode("password"));
        userRepository.save(user);
    }

    @Test
    public void login_ShouldAuthenticateUser() throws Exception {
        //Simulates an HTTP POST request to the "/login" endpoint
        mockMvc.perform(post("/login")
                        .param("username", "testuser")
                        .param("password", "password"))
                //HTTP response status is 'Found'.
                .andExpect(status().isFound())
                //Verifies the response includes redirection to the /home URL
                .andExpect(header().string("Location", "/home"));
    }

    @Test
    public void login_ShouldReturnError_WhenCredentialsAreInvalid()
            throws Exception {
        // Perform login request with invalid credentials
        mockMvc.perform(post("/login")
        .param("username", "testuser")
        .param("password", "wrongpassword"))
        .andExpect(status().isFound())
        .andExpect(header().string("Location", "/login?error"));
    }
}
