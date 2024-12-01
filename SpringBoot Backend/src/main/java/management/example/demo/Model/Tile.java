package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
public class Tile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String title;
    private String regNumber;

    @ManyToOne
    @JoinColumn(name = "section_id")
    @JsonIgnore
    private ConfirmedStudentSections confirmedStudentSections;

    @OneToOne(mappedBy = "tile", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Submission submission;

    @OneToOne(mappedBy = "tile", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Viva viva;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private ConfirmedStudent confirmedStudent;

    // Constructor, equals, hashCode, etc.
}
