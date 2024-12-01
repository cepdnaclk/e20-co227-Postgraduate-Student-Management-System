package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;
    private String originalFileName;
    private String fileName;
    private String type;

    @ManyToOne
    @JoinColumn(name = "submission_id")
    @JsonIgnore
    private Submission submission;

    @ManyToOne
    @JoinColumn(name = "examiner_id")
    private Examiner examiner;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private ConfirmedStudent confirmedStudent;
}

