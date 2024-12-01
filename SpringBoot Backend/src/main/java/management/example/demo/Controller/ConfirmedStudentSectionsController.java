package management.example.demo.Controller;

import management.example.demo.Model.*;
import management.example.demo.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sections")
public class ConfirmedStudentSectionsController {

    @Autowired
    private ConfirmedStudentSectionsService confirmedStudentSectionsService;

    @Autowired
    private ConfirmedStudentService confirmedStudentService;

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private VivaService vivaService;

//    @GetMapping("/{regNumber}/{tab}")
//    public ResponseEntity<List<ConfirmedStudentSections>> getSectionsByRegNumberAndTab(@PathVariable String regNumber, @PathVariable String tab) {
//        List<ConfirmedStudentSections> sections = confirmedStudentSectionsService.getSectionsByRegNumber(regNumber);
//
//        return ResponseEntity.ok(sections);
//    }

    // Find all sections for a student by their registration number and tab
    @GetMapping("/{regNumber}/{tab}")
    public ResponseEntity<List<ConfirmedStudentSections>> getSectionsByRegNumberAndTab(@PathVariable String regNumber, @PathVariable String tab) {
        List<ConfirmedStudentSections> sections = confirmedStudentSectionsService.getSectionsByRegNumberAndTab(regNumber, tab);
        return ResponseEntity.ok(sections);
    }

    // Find a section by its id
    @GetMapping("/{id}")
    public ResponseEntity<ConfirmedStudentSections> getSectionById(@PathVariable Long id) {
        ConfirmedStudentSections section = confirmedStudentSectionsService.getSectionById(id);
        return new ResponseEntity<>(section, HttpStatus.OK);
    }

    // Save the section
    @PostMapping
    public ResponseEntity<ConfirmedStudentSections> saveSection(@RequestBody ConfirmedStudentSections section) {
        System.out.println("Received section: " + section);
        // Retrieve the student associated with the section
        String sectionStudent = section.getRegNumber();

        //Set the tab
        System.out.println(section.getActiveTab());

        // Set the student attribute for each tile to match the section's student
        section.getTiles().forEach(tile -> {
            tile.setRegNumber(sectionStudent);
            tile.setConfirmedStudent(confirmedStudentService.get(sectionStudent));
            System.out.println("Updated Tile with Student: " + tile);
            ConfirmedStudent confirmedStudent = confirmedStudentService.get(sectionStudent);

            //Save in the submission repository
            if(tile.getType().equals("submission")) {

                //For pre-submission (for supervisor feedbacks)
                Submission preSubmission = new Submission();
                preSubmission.setTile(tile);
                preSubmission.setConfirmedStudent(confirmedStudent);
                preSubmission.setTitle(tile.getTitle());
                preSubmission.setSubmissionStatus(false);
                submissionService.saveSubmissionsParameters(preSubmission);

                //To create the feedbacks for the supervisors
                Feedback feedback = new Feedback();
                feedback.setConfirmedStudent(confirmedStudent);
                feedback.setSubmission(preSubmission);
                feedbackService.saveForum(feedback);

            } else if (tile.getType().equals("finalSubmission")) {

                Submission finalSubmission = new Submission();
                finalSubmission.setTile(tile);
                finalSubmission.setConfirmedStudent(confirmedStudent);
                finalSubmission.setTitle(tile.getTitle());
                finalSubmission.setSubmissionStatus(false);
                submissionService.saveSubmissionsParameters(finalSubmission);

            } else if (tile.getType().equals("forum")) {
                Feedback feedback = new Feedback();
                feedback.setConfirmedStudent(confirmedStudent);
                feedbackService.saveForum(feedback);
            }
            else if (tile.getType().equals("viva")){
                Viva viva = new Viva();
                viva.setTile(tile);
                viva.setTitle(tile.getTitle());
                viva.setConfirmedStudent(confirmedStudent);
                viva.setStatus("Pending");
                vivaService.saveViva(viva);
            }
        });


        // Save the section with the tiles now correctly linked to the student
        ConfirmedStudentSections savedSection = confirmedStudentSectionsService.saveSection(section);
        return ResponseEntity.ok(savedSection);
    }


    // Update the section by id
    @PutMapping("/{id}")
    public ResponseEntity<ConfirmedStudentSections> updateSection(@PathVariable Long id, @RequestBody ConfirmedStudentSections updatedSection) {
        ConfirmedStudentSections section = confirmedStudentSectionsService.getSectionById(id);

        if (section == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Handle if the section doesn't exist
        }
        System.out.println("Section: "+ updatedSection.getRegNumber()+ updatedSection.getButtonName()+ updatedSection.getActiveTab());

        String sectStudent = updatedSection.getRegNumber();
        if (sectStudent == null) {
            throw new IllegalArgumentException("Section student regNumber must not be null.");
        }
        ConfirmedStudent confirmedStudent = confirmedStudentService.get(sectStudent);

        // Only update fields if they are provided in the request
        if (updatedSection.getButtonName() != null) {
            section.setButtonName(updatedSection.getButtonName());
        }

        if (updatedSection.getActiveTab() != null) {
            section.setActiveTab(updatedSection.getActiveTab());
        }

        // Update the tiles collection without clearing all of them
        if (updatedSection.getTiles() != null) {
            // Remove old tiles that are not in the updated list
            section.getTiles().removeIf(existingTile ->
                    updatedSection.getTiles().stream().noneMatch(newTile ->
                            newTile.getId() != null && newTile.getId().equals(existingTile.getId())));

            // Add or update tiles from the updatedSection
            for (Tile updatedTile : updatedSection.getTiles()) {
                if (updatedTile.getId() == null) {
                    // New tile, add it
                    section.getTiles().add(updatedTile);

                    // Set relationships and create new associated entities if necessary
                    updatedTile.setRegNumber(sectStudent);
                    updatedTile.setConfirmedStudent(confirmedStudent);

                    // Create new entities based on tile type
                    if (updatedTile.getType().equals("submission")) {
                        Submission submission = new Submission();
                        submission.setTile(updatedTile);
                        submission.setConfirmedStudent(confirmedStudent);
                        submission.setTitle(updatedTile.getTitle());
                        submission.setSubmissionStatus(false);
                        submissionService.saveSubmissionsParameters(submission);
                    } else if (updatedTile.getType().equals("finalSubmission")) {
                        Submission finalSubmission = new Submission();
                        finalSubmission.setTile(updatedTile);
                        finalSubmission.setConfirmedStudent(confirmedStudent);
                        finalSubmission.setTitle(updatedTile.getTitle());
                        finalSubmission.setSubmissionStatus(false);
                        submissionService.saveSubmissionsParameters(finalSubmission);
                    } else if (updatedTile.getType().equals("viva")) {
                        Viva viva = new Viva();
                        viva.setTile(updatedTile);
                        viva.setTitle(updatedTile.getTitle());
                        viva.setConfirmedStudent(confirmedStudent);
                        viva.setStatus("Pending");
                        vivaService.saveViva(viva);
                    }

                } else {
                    // Existing tile, find and update the corresponding tile
                    section.getTiles().stream()
                            .filter(existingTile -> existingTile.getId().equals(updatedTile.getId()))
                            .findFirst()
                            .ifPresent(existingTile -> {
                                existingTile.setType(updatedTile.getType());
                                existingTile.setTitle(updatedTile.getTitle()); // Update the title of the tile

                                // Update the title in the associated submission and viva
                                if (existingTile.getSubmission() != null) {
                                    existingTile.getSubmission().setTitle(updatedTile.getTitle());  // Update title in submission
                                }

                                if (existingTile.getViva() != null) {
                                    existingTile.getViva().setTitle(updatedTile.getTitle());  // Update title in viva
                                }
                            });
                }
            }
        }

        // Save the updated section
        confirmedStudentSectionsService.saveSection(section);
        return new ResponseEntity<>(section, HttpStatus.OK);
    }


//    @PutMapping("/{id}")
//    public ResponseEntity<ConfirmedStudentSections> updateSection(@PathVariable Long id, @RequestBody ConfirmedStudentSections updatedSection) {
//        ConfirmedStudentSections section = confirmedStudentSectionsService.getSectionById(id);
//
//        if (section == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Handle if the section doesn't exist
//        }
//
//        // Update individual fields
//        section.setButtonName(updatedSection.getButtonName());
//        section.setActiveTab(updatedSection.getActiveTab());
//
//        // Update the tiles collection correctly
//        section.getTiles().clear();
//        for (Tile updatedTile : updatedSection.getTiles()) {
//            section.getTiles().add(updatedTile);  // Add each new tile
//        }
//
//        // Save the updated section
//        confirmedStudentSectionsService.saveSection(section);
//        return new ResponseEntity<>(section, HttpStatus.OK);
//    }


    // Delete the section by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        confirmedStudentSectionsService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }
}