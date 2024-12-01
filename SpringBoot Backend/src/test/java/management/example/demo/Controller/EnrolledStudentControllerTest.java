package management.example.demo.Controller;

import jakarta.mail.MessagingException;
import management.example.demo.Model.Student;
import management.example.demo.Service.EmailService;
import management.example.demo.Service.EnrolledStudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EnrolledStudentControllerTest {

    @Mock
    private EnrolledStudentService enrolledStudentService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AdminController enrollmentController;

    private Student student;

    @BeforeEach
    void setUp() {
        student = new Student();
        student.setId(1L);
        student.setEmail("student@example.com");
        student.setFullName("John Doe");
        student.setContactNumber("1234567890");
        student.setProgramOfStudy("Computer Science");
    }

//    @Test
//    void testConfirmEnrollmentApproved() {
//        //Mock the behavior of the enrolledStudentService
//        when(enrolledStudentService.get(1L)).thenReturn(student);
//
//        //Mock the behavior of the emailService
//        doNothing().when(emailService).sendMail(any(String.class), any(String.class), any(String.class));
//
//        //Call the method to test
//        ResponseEntity<String> response = enrollmentController.confirmEnrollment(1L, "Approved");
//
//        //Assert the response status code
//        assertEquals(200, response.getStatusCodeValue());
//
//        //Assert the response body
//        assertEquals("Approval email sent successfully.", response.getBody());
//    }
//
    @Test
    void testConfirmEnrollmentRejected() throws MessagingException {
        when(enrolledStudentService.get(1L)).thenReturn(student);
        doNothing().when(emailService).sendMail
                (any(String.class), any(String.class), any(String.class));

        ResponseEntity<String> response =
                enrollmentController.confirmEnrollment(1L, "rejected");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Rejection email sent successfully.", response.getBody());
    }


    //
//    @Test
//    void testConfirmEnrollmentStudentNotFound() {
//        when(enrolledStudentService.get(1L)).thenReturn(null);
//
//        ResponseEntity<String> response = enrollmentController.confirmEnrollment(1L, "Approved");
//
//        assertEquals(400, response.getStatusCodeValue());
//        assertEquals("Student not found.", response.getBody());
//    }
//
//    @Test
//    void testConfirmEnrollmentInvalidAction() {
//        when(enrolledStudentService.get(1L)).thenReturn(student);
//
//        ResponseEntity<String> response = enrollmentController.confirmEnrollment(1L, "invalid");
//
//        assertEquals(400, response.getStatusCodeValue());
//        assertEquals("Invalid action.", response.getBody());
//    }
}
