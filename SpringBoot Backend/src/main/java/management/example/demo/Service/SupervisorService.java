package management.example.demo.Service;

import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.Supervisor;
import management.example.demo.Repository.ConfirmedStudentRepository;
import management.example.demo.Repository.SupervisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupervisorService {
    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private ConfirmedStudentRepository confirmedStudentRepository;

    public List<Supervisor> listAll() {
        return supervisorRepository.findAll();
    }

    public List<ConfirmedStudent> getConfirmedStudentsBySupervisorId(Long supervisorId) {
        return confirmedStudentRepository.findBySupervisorId(supervisorId);
    }

    public Supervisor getByStudentRegNumber(String regNumber){
        return supervisorRepository.findByConfirmedStudentRegNumber(regNumber);
    }

}
