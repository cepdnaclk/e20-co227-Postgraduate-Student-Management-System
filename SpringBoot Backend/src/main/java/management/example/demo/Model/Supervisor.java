package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Supervisor {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //private String nameWithInitials;
    private String fullName;
    //private String department;
    private String email;
    private int noOfSupervisees;

    //There should be several supervisees in a table. How handle it???
    //Option 01: Join table with the confirmed student table.
    @OneToMany
    @JoinTable(
            name = "supervisor_supervisees",
            joinColumns = @JoinColumn(name = "supervisor_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    @JsonBackReference("confirmedStudent-supervisor") // This links to the @JsonManagedReference in ConfirmedStudent
    private List<ConfirmedStudent> supervisees;


}
