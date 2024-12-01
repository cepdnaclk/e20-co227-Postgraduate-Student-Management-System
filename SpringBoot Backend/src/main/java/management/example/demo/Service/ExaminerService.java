package management.example.demo.Service;

import management.example.demo.Model.Examiner;
import management.example.demo.Repository.ExaminerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExaminerService {

    @Autowired
    private ExaminerRepository examinerRepository;

    public Optional<Examiner> getExaminer(Long userId){
        return examinerRepository.findById(userId);
    }

    public List<Examiner> listAll(){
        return examinerRepository.findAll();
    }

    public List<Examiner> findBySubmissionId(Long submissionId){
        return examinerRepository.findBySubmissions_Id(submissionId);
    }
}
