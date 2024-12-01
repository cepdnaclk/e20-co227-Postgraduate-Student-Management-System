package management.example.demo.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
public class EducationalQualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String university;

    private LocalDate fromDate;

    private LocalDate toDate;

    private String degree;

    private String field;

    // Assuming each qualification can have multiple attachments
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FileMetadata> attachments;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;
}