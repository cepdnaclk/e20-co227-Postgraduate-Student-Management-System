package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String message;

    @Column(name = "`read`")
    private boolean read;

    private LocalDateTime timestamp;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference  // Prevent recursive serialization of the User
    private User user;


}