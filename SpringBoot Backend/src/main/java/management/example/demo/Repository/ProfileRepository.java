package management.example.demo.Repository;

import management.example.demo.Model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long>{

    Optional<Profile> findById(Long id);


}
