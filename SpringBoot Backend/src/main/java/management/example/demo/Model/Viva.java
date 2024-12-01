package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Viva {

    @Id
    private Long id;
    private String title;
    private String status;
    private LocalDateTime vivaDate;
    private String comments;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private ConfirmedStudent confirmedStudent;

    @OneToOne
    @MapsId
    @JoinColumn(name = "tile_id")
    @JsonBackReference("viva-tile")
    private Tile tile;
}

