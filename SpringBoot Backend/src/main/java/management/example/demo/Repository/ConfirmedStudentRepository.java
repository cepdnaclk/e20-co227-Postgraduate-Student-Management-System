package management.example.demo.Repository;

import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConfirmedStudentRepository extends JpaRepository<ConfirmedStudent, String> {

    User save(User user);

    List<ConfirmedStudent> findBySupervisorId(Long supervisorId);

    //    Optional<ConfirmedStudent> findTopByOrderByIdDesc();

    @Query("SELECT COUNT(cs) FROM ConfirmedStudent cs WHERE YEAR(cs.createdDate) = :currentYear")
    long countByCurrentYear(@Param("currentYear") int currentYear);

    ConfirmedStudent findBySubmissions_Id(Long submissionId);

    List<ConfirmedStudent> findAllBy();
}
