package management.example.demo.Repository;

import management.example.demo.DTO.FileMetadataDto;
import management.example.demo.Model.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {

    Optional<FileMetadata> findByFileName(String fileName);

    // Method to find all FileMetadata by submission ID
    List<FileMetadata> findBySubmissionId(Long submissionId);

    @Query("SELECT new management.example.demo.DTO.FileMetadataDto(f.originalFileName, f.fileName, f.fileSize) " +
            "FROM FileMetadata f WHERE f.submission.id = :submissionId")
    List<FileMetadataDto> findFileMetadataDtoBySubmissionId(Long submissionId);
}
