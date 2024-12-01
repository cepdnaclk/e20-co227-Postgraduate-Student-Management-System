package management.example.demo.Repository;

import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.Viva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VivaRepository extends JpaRepository<Viva, Long> {
    List<Viva> findByConfirmedStudent(ConfirmedStudent confirmedStudent);

    Viva save(Viva viva);

}
