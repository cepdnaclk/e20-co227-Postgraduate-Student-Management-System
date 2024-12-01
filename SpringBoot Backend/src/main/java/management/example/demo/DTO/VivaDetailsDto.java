package management.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VivaDetailsDto {

    private Long id;
    private String title;
    private LocalDateTime vivaDate;
    private String comments;
    private String regNumber;
    private String registrationNumber;
    private String status;

}
