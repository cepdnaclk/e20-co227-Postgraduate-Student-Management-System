package management.example.demo.Repository;

import management.example.demo.Model.User;
import management.example.demo.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    User save(User user);

    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findUserWithoutRolesById(@Param("id") Long id);

    Optional<User> findByRolesContaining(Role role);

}