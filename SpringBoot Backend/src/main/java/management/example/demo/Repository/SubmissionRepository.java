package management.example.demo.Repository;

import jakarta.transaction.Transactional;
import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.Submission;
import management.example.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Optional<Submission> findById(Long id);

    List<Submission> findByConfirmedStudent(ConfirmedStudent confirmedStudent);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM submission_examiner WHERE submission_id = :submissionId AND examiner_id = :examinerId", nativeQuery = true)
    void removeExaminerFromSubmission(@Param("submissionId") Long submissionId, @Param("examinerId") Long examinerId);

    @Query(value = "SELECT cs.reg_number AS regNumber,cs.registration_number AS registrationNumber, cs.name_with_initials AS nameWithInitials, s.tile_id AS id, s.title AS title,s.deadline AS deadline,s.submission_status AS submissionStatus, GROUP_CONCAT(e.full_name) AS examiners " +
            "FROM submission s " +
            "JOIN confirmed_student cs ON s.student_id = cs.reg_number " +
            "JOIN submission_examiner se ON s.tile_id = se.submission_id " +
            "JOIN examiner e ON se.examiner_id = e.id " +
            "GROUP BY  cs.reg_number, cs.registration_number, cs.name_with_initials, s.tile_id, s.title, s.deadline, s.submission_status", nativeQuery = true)
    List<Object[]> findAllStudentSubmissionDetailsRaw();

    // Using JPQL query to fetch submissions by examiner ID
    // Custom query to fetch specific fields based on examiner ID
    @Query(value = "SELECT cs.reg_number AS regNumber, cs.registration_number AS registrationNumber, cs.name_with_initials AS nameWithInitials, " +
            "s.tile_id AS id, s.title AS title, s.deadline AS deadline, s.submission_status AS submissionStatus, s.deadline_to_review AS deadlineToReview, " + // Added space after deadlineToReview
            "GROUP_CONCAT(e.full_name) AS examiners " +
            "FROM submission s " +
            "JOIN confirmed_student cs ON s.student_id = cs.reg_number " +
            "JOIN submission_examiner se ON s.tile_id = se.submission_id " +
            "JOIN examiner e ON se.examiner_id = e.id " +
            "WHERE e.id = :examinerId " +
            "GROUP BY cs.reg_number, cs.registration_number, cs.name_with_initials, s.tile_id, s.title, s.deadline, s.submission_status, s.deadline_to_review",
            nativeQuery = true)
    List<Object[]> findStudentSubmissionExaminerDetailsByExaminerId(@Param("examinerId") Long examinerId);

    User save(User user);
}
