package management.example.demo.Service;

import management.example.demo.Model.FileMetadata;
import management.example.demo.Model.Student;
import management.example.demo.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;



    public Student saveStudent(Student student) {
        //student.setStatus(Student.Status.valueOf("PENDING"));
        return studentRepository.save(student);
    }

    public Optional<Student> getStudent(Long id){
        return studentRepository.findById(id);
    }

    public List<FileMetadata> getFileMetadataByStuId(Long id){
        return studentRepository.findFilesByStudentId(id);
    }
}











