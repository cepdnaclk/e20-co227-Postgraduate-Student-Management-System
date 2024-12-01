package management.example.demo.Controller;

import management.example.demo.Model.Feedback;
import management.example.demo.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/submission/{submissionId}")
    public List<Feedback> getAllFeedbacksRelatedToSubmissionAndType(@PathVariable(name = "submissionId") Long submissionId){
        return feedbackService.getAllFeedbacks(submissionId);
    }

    // Update feedback with body and file for Examiners
    @PutMapping("/submission/{submissionId}/examiner/update/{examinerId}")
    public ResponseEntity<Feedback> updateExaminerFeedback(
            @PathVariable Long submissionId,
            @PathVariable Long examinerId,
            @RequestParam("body") String body,
            @RequestParam("file") MultipartFile file) throws IOException {

        Feedback updatedFeedback = feedbackService.updateFeedback(submissionId, examinerId, body, file);
        return ResponseEntity.ok(updatedFeedback);
    }


    // Load feedback related to the submission and examiner
    @GetMapping("/submission/{submissionId}/examiner/{examinerId}")
    public ResponseEntity<Feedback> loadFeedbackForExaminer(
            @PathVariable Long submissionId,
            @PathVariable Long examinerId) {

        Optional<Feedback> feedbackOpt = feedbackService.getFeedbackRelatedToExaminer(submissionId, examinerId);
        return feedbackOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    // Update feedback with body and file for Examiners
    @PutMapping("/supervisorSubmission/{submissionId}")
    public ResponseEntity<Feedback> updateSupervisorFeedback(
            @PathVariable Long submissionId,
            @RequestParam("body") String body,
            @RequestParam("file") MultipartFile file) throws IOException {

        Feedback updatedFeedback = feedbackService.updateSupervisorFeedback(submissionId, body, file);
        return ResponseEntity.ok(updatedFeedback);
    }


}