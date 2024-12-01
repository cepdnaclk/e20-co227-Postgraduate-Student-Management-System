package management.example.demo.Repository;

import jakarta.transaction.Transactional;
import management.example.demo.Model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findAllBySubmissionId(Long submissionId);

    Feedback save(Feedback feedback);

    // Custom query to find feedback by submission ID and examiner ID
    @Query("SELECT f FROM Feedback f WHERE f.submission.id = :submissionId AND f.examiner.Id = :examinerId")
    Optional<Feedback> findBySubmissionIdAndExaminerId(@Param("submissionId") Long submissionId, @Param("examinerId") Long examinerId);

    // Custom query to find feedback by submission ID
    @Query("SELECT f FROM Feedback f WHERE f.submission.id = :submissionId")
    Optional<Feedback> findBySubmissionId(@Param("submissionId") Long submissionId);

    // Custom method to delete feedbacks by submission ID and examiner ID
    @Transactional
    void deleteBySubmissionIdAndExaminerId(Long submissionId, Long examinerId);
}
