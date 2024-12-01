package management.example.demo.Service;

import management.example.demo.DTO.VivaDetailsDto;
import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.Viva;
import management.example.demo.Repository.VivaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VivaService {

    @Autowired
    private VivaRepository vivaRepository;

    public Viva get(Long id){
        return vivaRepository.findById(id).get();
    }

    public Viva saveViva(Viva viva) {
        return vivaRepository.save(viva);
    }

    public List<Viva> getAll(){
        return vivaRepository.findAll();
    }

    //To get all the viva details
    public List<VivaDetailsDto> getAllVivaDetails() {
        List<Viva> vivas = getAll();
        List<VivaDetailsDto> vivaDetailsDtoList = new ArrayList<>();

        for (Viva viva : vivas) {
            VivaDetailsDto dto = new VivaDetailsDto();
            dto.setId(viva.getId());
            dto.setTitle(viva.getTitle());
            dto.setVivaDate(viva.getVivaDate());
            dto.setComments(viva.getComments());
            dto.setStatus(viva.getStatus());

            // Assuming ConfirmedStudent has registration details
            ConfirmedStudent confirmedStudent = viva.getConfirmedStudent();
            if (confirmedStudent != null) {
                dto.setRegNumber(confirmedStudent.getRegNumber());
                dto.setRegistrationNumber(confirmedStudent.getRegistrationNumber());
            }

            vivaDetailsDtoList.add(dto);
        }

        return vivaDetailsDtoList;
    }
}
