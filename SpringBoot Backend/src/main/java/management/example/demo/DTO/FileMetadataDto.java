package management.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileMetadataDto {

    private String fileName;
    private String originalFileName;
    private Long fileSize;

    // Constructors
    public FileMetadataDto(String originalFileName, String fileName, Long fileSize) {
        this.originalFileName = originalFileName;
        this.fileName = fileName;
        this.fileSize = fileSize;
    }
}
