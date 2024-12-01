package management.example.demo.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class EmailTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String subject;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String body;

    private Long userId;
    private String type;
    // Getters and Setters

}


