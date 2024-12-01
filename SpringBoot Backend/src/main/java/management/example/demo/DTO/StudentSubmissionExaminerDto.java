package management.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class StudentSubmissionExaminerDto {
    private String regNumber;
    private String registrationNumber;
    private String nameWithInitials;
    private Long id;
    private String title;
    private LocalDateTime deadline;
    private Boolean submissionStatus;
    private LocalDateTime deadlineToReview;
    private List<String> examiners;

    // Constructors, Getters, and Setters
    public StudentSubmissionExaminerDto(String regNumber, String registrationNumber, String nameWithInitials,Long id, String title, LocalDateTime deadline,Boolean submissionStatus,LocalDateTime deadlineToReview, List<String> examiners) {
        this.regNumber = regNumber;
        this.registrationNumber = registrationNumber;
        this.nameWithInitials = nameWithInitials;
        this.id = id;
        this.title = title;
        this.deadline= deadline;
        this.submissionStatus= submissionStatus;
        this.deadlineToReview = deadlineToReview;
        this.examiners = examiners;
    }


    public StudentSubmissionExaminerDto() {

    }

    // Getters and Setters
}