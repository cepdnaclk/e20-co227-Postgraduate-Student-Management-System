package management.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileUpdateRequest {

    //For students
    private String nameWithInitials;

    //For staff members
    private String name;
    private String username;

    //Both parties
    private String contactNumber;
    private String email;
}
