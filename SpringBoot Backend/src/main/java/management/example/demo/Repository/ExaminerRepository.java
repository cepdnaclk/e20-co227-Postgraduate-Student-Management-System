package management.example.demo.Repository;


import management.example.demo.Model.Examiner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExaminerRepository extends JpaRepository<Examiner, Long> {
    Optional<Examiner> findById(Long id);

    List<Examiner> findBySubmissions_Id(Long submissionId);
}
