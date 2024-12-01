package management.example.demo.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String registrationNumber;
    private String nameWithInitials;
    private String fullName;
    private String contactNumber;
    private String email;
    private String address;
    private String publications;
    private String programOfStudy;
    private String status;
    private Date registeredDate;
    private String registrationStatus;
    // New fields for Student ID and Birth Certificate
    private String studentIdDocument;
    private String studentIdDocumentOriginalName;
    private String birthCertificate;
    private String birthCertificateOriginalName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<FileMetadata> fileMetadata;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EducationalQualification> educationalQualifications;
}