package management.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SubmissionDetailDto {
    private String title;
    private LocalDateTime openedDate;
    private LocalDateTime dueDate;
    private Boolean submissionStatus;
    private LocalDateTime lastModified;
    private LocalDateTime deadlineToReview;
}
