package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
public class ConfirmedStudent {
    @Id
    private String regNumber;

    private String registrationNumber;

    //Username for logging the system
//    private String username;
    private String nameWithInitials;
    private String fullName;
    private String contactNumber;
    private String email;
    private String address;
    private String university;
    private String fromDate;
    private String toDate;
    private String degree;
    private String field;
    private String classPass;
    private String publications;
    private String programOfStudy;
    private String status;
    private Date registeredDate;

    //This attribute is created for generating registration number
    @CreationTimestamp
    private LocalDate createdDate;

    @Getter
    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    //@JsonManagedReference("confirmedStudent-supervisor") // Ensure this matches the back-reference in Supervisor
    @JsonIgnore
    private Supervisor supervisor;

    //Student's submissions
    @OneToMany
    @Getter
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private List<Submission> submissions;



    //Feedbacks from the supervisors or examiners
    @OneToMany
    @Getter
    //@JsonManagedReference("confirmedStudent-forums")
    @JsonIgnore
    private List<Feedback> feedbacks;


    //confirmed postgraduate student count in the year
    //this count will reset when the year changed
    @Getter
    @Transient //This attribute is not in the database table
    @GeneratedValue(strategy = GenerationType.AUTO)
    static int count;

    //year variable to compare with current year
    @Getter
    @Transient
    static int year = 2024;

    public static int setCountToOne() {
        return ConfirmedStudent.count = 1;
    }

}
