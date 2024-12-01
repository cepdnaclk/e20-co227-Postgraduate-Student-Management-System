package management.example.demo.Repository;

import management.example.demo.Model.ConfirmedStudentSections;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConfirmedStudentSectionsRepository extends JpaRepository<ConfirmedStudentSections, Long> {

    List<ConfirmedStudentSections> findByregNumber(String regNumber);

    List<ConfirmedStudentSections> findByRegNumberAndActiveTab(String regNumber, String activeTab);
}