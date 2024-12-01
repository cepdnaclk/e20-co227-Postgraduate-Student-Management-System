package management.example.demo.Controller;

import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Repository.UserRepository;
import management.example.demo.Service.ConfirmedStudentService;
import management.example.demo.Service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/supervisor")
public class SupervisorController {

    @Autowired
    private SupervisorService supervisorService;

    @Autowired
    private ConfirmedStudentService confirmedStudentService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/students/{username}")
    public List<ConfirmedStudent> getConfirmedStudents(@PathVariable String username) {
        Long supervisorId = userRepository.findByUsername(username).getId();
        return supervisorService.getConfirmedStudentsBySupervisorId(supervisorId);
    }

//    @GetMapping("/studentsToSupervisor")
//    public List<ConfirmedStudent> getConfirmedStudents(Principal principal) {
//        // Assuming the username is the supervisorId
//        Long supervisorId = Long.parseLong(principal.getName());
//        return supervisorService.getConfirmedStudentsBySupervisorId(supervisorId);
//    }

    @GetMapping(value = "/students/{regNumber}/supervisor", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getSupervisorName(@PathVariable String regNumber) {

        ConfirmedStudent confirmedStudent = confirmedStudentService.get(regNumber);

        if (confirmedStudent != null && confirmedStudent.getSupervisor() != null) {
            return ResponseEntity.ok(confirmedStudent.getSupervisor().getFullName());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No supervisor assigned");
        }
    }

}
