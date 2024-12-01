package management.example.demo.Repository;

import management.example.demo.Model.EmailTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {
    Optional<EmailTemplate> findByName(String name);

    List<EmailTemplate> findByUserId(Long userId);

    List<EmailTemplate> findByUserIdOrType(Long userId, String type);
}
