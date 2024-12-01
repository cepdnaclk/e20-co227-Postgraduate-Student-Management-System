package management.example.demo.Repository;

import management.example.demo.Model.Supervisor;
import management.example.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {
    Optional<Supervisor> findById(Long id);
    User save(User user);


    // JPQL query to find Supervisor by the student's registration number
    @Query("SELECT s FROM Supervisor s JOIN s.supervisees cs WHERE cs.regNumber = :regNumber")
    Supervisor findByConfirmedStudentRegNumber(String regNumber);

}
