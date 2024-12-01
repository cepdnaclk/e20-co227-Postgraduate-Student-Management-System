package management.example.demo.Service;

import management.example.demo.Model.User;

import java.util.Optional;

public interface UserService {
    User findByUsername(String username);

    Optional<User> findById(Long id);

    User save(User user);


}