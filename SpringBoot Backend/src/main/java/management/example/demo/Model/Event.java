package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private  String description;
    private String type;
    private String colour;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean everyYear;

    //Relationship with the USER entity
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

}
