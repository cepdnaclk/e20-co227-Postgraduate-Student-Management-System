package management.example.demo.Service;

import management.example.demo.DTO.StudentSubmissionExaminerDto;
import management.example.demo.Model.Examiner;
import management.example.demo.Model.FileMetadata;
import management.example.demo.Model.Submission;
import management.example.demo.Repository.ExaminerRepository;
import management.example.demo.Repository.FeedbackRepository;
import management.example.demo.Repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubmissionService  {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private FileService fileUploadService;

    @Autowired
    private ExaminerRepository examinerRepository;
    @Autowired
    FeedbackRepository feedbackRepository;

    public Submission get(Long id){
        return submissionRepository.findById(id).get();
    }

    public List<Submission> findAll(){
        return submissionRepository.findAll();
    }

    //Save the submissions
    public Submission saveSubmissionsParameters(Submission submission){
        return submissionRepository.save(submission);
    }

    //Upload the file (report)
    public void saveSubmission(Submission submission, @RequestParam("file")MultipartFile file){
        List<String> attachmentData = fileUploadService.uploadFile(file);
        submission.setFileName((String) attachmentData.get(1));
        submissionRepository.save(submission);
    }

    //Add a section to submit the reports by the admin
    public void addSubmissionField(Submission submission, @RequestParam String title){
        submission.setTitle(title);
        submissionRepository.save(submission);
    }

//    public void deleteExaminerFromSubmission(Long submissionId, Long examinerId) {
//        submissionRepository.removeExaminerFromSubmission(submissionId, examinerId);
//        feedbackRepository.deleteBySubmissionIdAndExaminerId(submissionId, examinerId);
//    }

    public void deleteExaminerFromSubmission(Long submissionId, Long examinerId) {
        // Remove the examiner from the submission
        submissionRepository.removeExaminerFromSubmission(submissionId, examinerId);

        // Delete the associated feedback
        feedbackRepository.deleteBySubmissionIdAndExaminerId(submissionId, examinerId);

        // Decrease the number of submissions for the examiner
        Optional<Examiner> examinerOpt = examinerRepository.findById(examinerId);
        if (examinerOpt.isPresent()) {
            Examiner examiner = examinerOpt.get();

            // Decrement the number of submissions, ensuring it doesn't go below 0
            Long currentSubmissions = examiner.getNoOfSubmissions() != null ? examiner.getNoOfSubmissions() : 0L;
            if (currentSubmissions > 0) {
                examiner.setNoOfSubmissions(currentSubmissions - 1);
            }

            // Save the updated examiner entity
            examinerRepository.save(examiner);
        }
    }

    // Service Method
    public List<StudentSubmissionExaminerDto> getAllStudentSubmissions() {
        List<Object[]> results = submissionRepository.findAllStudentSubmissionDetailsRaw();
        return results.stream()
                .map(result -> new StudentSubmissionExaminerDto(
                        (String) result[0], // regNumber
                        (String) result[1], // registrationNumber
                        (String) result[2], // nameWithInitials
                        (Long) result[3], //
                        (String) result[4], // title
                        convertToLocalDateTime((Timestamp) result[5]), // deadline
                        (Boolean) result[6], // submissionStatus
                        //convertToLocalDateTime((Timestamp) result[6]),
                        null,
                        Arrays.asList(((String) result[7]).split(", ")) // examiners
                ))
                .collect(Collectors.toList());
    }


    // Utility method to convert Timestamp to LocalDateTime
    private LocalDateTime convertToLocalDateTime(Timestamp timestamp) {
        return timestamp != null ? timestamp.toLocalDateTime() : null;
    }


    public List<StudentSubmissionExaminerDto> getStudentSubmissionExaminerDetails(Long examinerId) {
        List<Object[]> results = submissionRepository.findStudentSubmissionExaminerDetailsByExaminerId(examinerId);
        List<StudentSubmissionExaminerDto> dtos = new ArrayList<>();

        for (Object[] result : results) {
            String regNumber = (String) result[0];
            String registrationNumber = (String) result[1];
            String nameWithInitials = (String) result[2];
            Long id = (Long) result[3];
            String title = (String) result[4];
            LocalDateTime deadline =convertToLocalDateTime((Timestamp) result[5]);
            Boolean submissionStatus = (Boolean) result[6];
            LocalDateTime deadlineToReview = (LocalDateTime) result[7];
            //String examiners = (String) result[6]; // This will be a comma-separated list of examiner names

            // Convert comma-separated examiners list to a list if needed
            //List<String> examinerList = Arrays.asList(examiners.split(","));

            StudentSubmissionExaminerDto dto = new StudentSubmissionExaminerDto(
                    regNumber, registrationNumber, nameWithInitials,id,  title, deadline, submissionStatus, deadlineToReview, null
            );
            dtos.add(dto);
        }
        return dtos;
    }

    //Remove the submitted files by the student
    public void removeSubmittedSubmissionFiles(Long submissionId){
        List<FileMetadata> fileList= fileUploadService.getAllFilesSubmittedByStudent(submissionId);
        for (FileMetadata fileMetadata: fileList){
            fileUploadService.deleteFileByName(fileMetadata.getFileName());
        }
    }

}
