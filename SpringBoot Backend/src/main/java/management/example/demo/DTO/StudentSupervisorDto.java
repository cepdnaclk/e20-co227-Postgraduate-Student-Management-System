package management.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentSupervisorDto {

    private String regNumber;
    private String registrationNumber;
    private String nameWithInitials;
    private String supervisorFullName;

    public StudentSupervisorDto(String regNumber, String registrationNumber,  String nameWithInitials, String supervisorFullName) {
        this.regNumber = regNumber;
        this.registrationNumber= registrationNumber;
        this.nameWithInitials = nameWithInitials;
        this.supervisorFullName = supervisorFullName;
    }
}
