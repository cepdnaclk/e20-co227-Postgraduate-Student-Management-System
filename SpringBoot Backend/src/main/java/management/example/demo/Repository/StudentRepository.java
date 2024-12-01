package management.example.demo.Repository;


import management.example.demo.Model.FileMetadata;
import management.example.demo.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Custom query method to find a student by ID and fetch the files related to them
    @Query("SELECT s.fileMetadata FROM Student s WHERE s.id = :studentId")
    List<FileMetadata> findFilesByStudentId(@Param("studentId") Long studentId);

}