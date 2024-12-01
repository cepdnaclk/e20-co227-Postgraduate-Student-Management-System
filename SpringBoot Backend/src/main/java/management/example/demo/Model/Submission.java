package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@Entity
public class Submission {

    @Id
    private Long id;

    private String title;
    private String fileName;
    private LocalDateTime openDate;
    private LocalDateTime deadline;
    private Boolean submissionStatus;
    private LocalDateTime lastModified;
    private LocalDateTime deadlineToReview;

    //Examiners who is assigned to submissions
    @ManyToMany
    @JoinTable(
            name = "submission_examiner",
            joinColumns = @JoinColumn(name = "submission_id"),
            inverseJoinColumns = @JoinColumn(name = "examiner_id")
    )
    @Getter
    @JsonManagedReference("submissions-examiners")
    private List<Examiner> examiners = new ArrayList<>();

    //Submissions related to a specific student
    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private ConfirmedStudent confirmedStudent;

    @OneToOne
    @MapsId
    @JoinColumn(name = "tile_id")
    @JsonIgnore
    private Tile tile;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feedback> feedbacks = new ArrayList<>();

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL)
    @JsonManagedReference("submission-fileMetadatas")
    private List<FileMetadata> fileMetadataList = new ArrayList<>();

    // Add a file metadata to the submission
    public void addFileMetadata(FileMetadata fileMetadata) {
        fileMetadataList.add(fileMetadata);
        fileMetadata.setSubmission(this);
    }

    // Remove a file metadata from the submission
    public void removeFileMetadata(FileMetadata fileMetadata) {
        fileMetadataList.remove(fileMetadata);
        fileMetadata.setSubmission(null);
    }

    // Methods to add/remove file metadata
}

