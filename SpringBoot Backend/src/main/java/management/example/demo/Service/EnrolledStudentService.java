package management.example.demo.Service;


import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.Student;
import management.example.demo.Model.User;
import management.example.demo.Repository.ConfirmedStudentRepository;
import management.example.demo.Repository.StudentRepository;
import management.example.demo.Repository.UserRepository;
import management.example.demo.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EnrolledStudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmedStudentRepository confirmedStudentRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public List<Student> listAll() {
        return studentRepository.findAll();
    }

    public Optional<Student> findById(Long id){
        return studentRepository.findById(id);
    }

    public Student get(long id){
        return studentRepository.findById(id).get();
    }

    public Student save(Student student){
        return studentRepository.save(student);
    }

    public void delete(long id){
        studentRepository.deleteById(id);
    }

    public User confirm(Student user_){
        Set<Role> roles = new HashSet<>();
        roles.add(Role.STUDENT);
        User user = new User(
                //Assuming fullName as the username, firstName, and LastName
                user_.getFullName(),
                user_.getFullName(),
                //user_.getFullName(),
                //Get the email
                user_.getEmail(),
                //Assuming contactNumber as the password
                passwordEncoder.encode(user_.getContactNumber()),
                roles);
        return userRepository.save(user); //Save user in the database
    }


    //Save the student details in the confirmed student table
    public ConfirmedStudent saveStudent(Student user_){
        ConfirmedStudent confirmedStudent = new ConfirmedStudent();

        //creating the last digits of the registration number

        Long count ;

        count = confirmedStudentRepository.countByCurrentYear(Year.now().getValue());
        count++;

        // Format count to always have 3 digits
        String formattedCount = String.format("%02d", count);

        //confirmedStudent.setId(user_.getId());
        //Generate the registration number
        //confirmedStudent.setRegNumber("PG/"+ LocalDate.now().getYear() + "/" + String.valueOf(ConfirmedStudent.getCount()));

        confirmedStudent.setRegNumber("PG_" + user_.getProgramOfStudy() + "_" + ((LocalDate.now().getYear())%100) + "_" + formattedCount);

        confirmedStudent.setRegistrationNumber(user_.getRegistrationNumber());
        confirmedStudent.setNameWithInitials(user_.getNameWithInitials());
        confirmedStudent.setFullName(user_.getFullName());
        confirmedStudent.setContactNumber(user_.getContactNumber());
        confirmedStudent.setEmail(user_.getEmail());
        confirmedStudent.setAddress(user_.getAddress());
//        confirmedStudent.setUniversity(user_.getUniversity());
//        confirmedStudent.setFromDate(user_.getFromDate());
//        confirmedStudent.setToDate(user_.getToDate());
//        confirmedStudent.setDegree(user_.getDegree());
//        confirmedStudent.setField(user_.getField());
//        confirmedStudent.setClassPass(user_.getClassPass());
        confirmedStudent.setPublications(user_.getPublications());
        confirmedStudent.setProgramOfStudy(user_.getProgramOfStudy());
        confirmedStudent.setStatus(user_.getStatus());
        confirmedStudent.setRegisteredDate(user_.getRegisteredDate());

        //Save the approved student service in the User entity
        Set<Role> roles = new HashSet<>();
        roles.add(Role.STUDENT);

        //Set the username
//        String username = removeCharacter(confirmedStudent.getRegNumber(), '/');
//        confirmedStudent.setUsername(username);
        User user = new User(
                //Assuming fullName as the username, firstName, and LastName
                confirmedStudent.getRegNumber(),
                confirmedStudent.getNameWithInitials(),
                confirmedStudent.getEmail(),
                //Assuming contactNumber as the password
                passwordEncoder.encode(confirmedStudent.getContactNumber()),
                roles);
        userRepository.save(user);

        return confirmedStudentRepository.save(confirmedStudent);
    }

    //Assign supervisors to the students (by the admin)

    public String removeCharacter(String input, char toRemove) {
        // Create a StringBuilder to build the result string
        StringBuilder result = new StringBuilder();

        // Iterate through the input string
        for (int i = 0; i < input.length(); i++) {
            // If the current character is not the one to remove, append it to the result
            if (input.charAt(i) != toRemove) {
                result.append(input.charAt(i));
            }
        }

        // Convert the StringBuilder to a String and return it
        return result.toString();
    }
}


