package management.example.demo.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import management.example.demo.DTO.UserProfileUpdateRequest;
import management.example.demo.Model.ConfirmedStudent;
import management.example.demo.Model.Profile;
import management.example.demo.Model.User;
import management.example.demo.Repository.ConfirmedStudentRepository;
import management.example.demo.Repository.ProfileRepository;
import management.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ConfirmedStudentRepository confirmedStudentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;
    @Autowired
    private UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Value("${upload.path}")
    private String uploadDir;

    public boolean updateStudentProfile(String username, UserProfileUpdateRequest profileUpdateRequest) {
        Optional<ConfirmedStudent> confirmedStudentOptional = confirmedStudentRepository.findById(username);
        User user = userService.findByUsername(username);

        if (confirmedStudentOptional.isPresent()) {
            ConfirmedStudent confirmedStudent = confirmedStudentOptional.get();
            // Only update fields if they are not null or empty in the request
            if (profileUpdateRequest.getNameWithInitials() != null && !profileUpdateRequest.getNameWithInitials().isEmpty()) {
                confirmedStudent.setNameWithInitials(profileUpdateRequest.getNameWithInitials());
            }

            if (profileUpdateRequest.getContactNumber() != null && !profileUpdateRequest.getContactNumber().isEmpty()) {
                confirmedStudent.setContactNumber(profileUpdateRequest.getContactNumber());
                user.setContactNumber(profileUpdateRequest.getContactNumber());
            }

            if (profileUpdateRequest.getEmail() != null && !profileUpdateRequest.getEmail().isEmpty()) {
                confirmedStudent.setEmail(profileUpdateRequest.getEmail());
                user.setEmail(profileUpdateRequest.getEmail());
            }

            confirmedStudentRepository.save(confirmedStudent);
            return true;
        } else {
            return false;
        }
    }

    //Update the profile - staff members
    @Transactional
    public boolean updateStaffMemberProfile(Long userId, UserProfileUpdateRequest profileUpdateRequest) {
        Optional<User> userOpt = userService.findById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Detach the user entity to avoid collection-related checks
            entityManager.detach(user);

            // Update fields only if not null or empty in the request
            if (profileUpdateRequest.getName() != null && !profileUpdateRequest.getName().isEmpty()) {
                user.setName(profileUpdateRequest.getName());
            }

            if (profileUpdateRequest.getUsername() != null && !profileUpdateRequest.getUsername().isEmpty()) {
                user.setUsername(profileUpdateRequest.getUsername());
            }

            if (profileUpdateRequest.getContactNumber() != null && !profileUpdateRequest.getContactNumber().isEmpty()) {
                user.setContactNumber(profileUpdateRequest.getContactNumber());
            }

            if (profileUpdateRequest.getEmail() != null && !profileUpdateRequest.getEmail().isEmpty()) {
                user.setEmail(profileUpdateRequest.getEmail());
            }

            // Reattach and save the updated user entity
            entityManager.merge(user);
            return true;
        } else {
            return false; // User not found
        }
    }





    public String updateProfilePicture(MultipartFile file , Long userId) {
        // Attempt to find the profile by its ID
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Profile> profileOpt = profileRepository.findById(userId);

        if (!userOpt.isPresent()) {
            return "User not found"; // Handle the case where the User does not exist
        }

        User user = userOpt.get();
        Profile profile;

        if (profileOpt.isPresent()) {
            // Profile exists, update it
            profile = profileOpt.get();
        } else {
            // Profile does not exist, create a new one and set the user
            profile = new Profile();
            profile.setUser(user); // Ensure the User is set correctly
        }

        // Upload the file and get the unique file name
        // When using the uploadFile method in the fileService, it saves the file data in the fileMetadata,
        // But when deleting the profile picture it is not handle to delete the related data from the entity
        //Consider it.
        List<String> fileData = fileService.uploadFile(file);
        String uniqueFileName = fileData.get(0); // Get the unique file name from the uploaded file data

        // Set the profile picture to the unique file name
        profile.setProfilePicture(uniqueFileName);

        // Save the profile (either updated or newly created) to the repository
        profileRepository.save(profile);

        return "Profile picture updated successfully";
    }


    public Resource getProfilePicture(Long userId) {
        // Fetch the profile picture metadata using the user ID
        Optional<Profile> optionalProfile = profileRepository.findById(userId);

        if (optionalProfile.isEmpty()) {
            System.out.println("Profile not found for user ID: " + userId);
            // Return a default image or handle the response accordingly
            return null; // Handle this appropriately (e.g., returning a default image)
        }

        Profile profile = optionalProfile.get();

        // Check if the profile picture is set
        if (profile.getProfilePicture() == null) {
            System.out.println("No profile picture set for user ID: " + userId);
            return null; // Or handle this case as you prefer
        }

        try {
            Path filePath = Paths.get(uploadDir).resolve(profile.getProfilePicture()).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                System.out.println("Profile picture file not found or unreadable for user ID: " + userId);
                return null;
            }
        } catch (MalformedURLException e) {
            System.out.println("Error retrieving profile picture for user ID: " + userId + ". Error: " + e.getMessage());
            return null;
        }
    }

    public String deleteProfilePicture(Long userId) {
        // Fetch the profile picture metadata using the user ID
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile picture not found for user ID " + userId));

        try {
            // Define the path to the profile picture
            Path filePath = Paths.get(uploadDir).resolve(profile.getProfilePicture()).normalize();

            // Delete the file from the file system
            Files.deleteIfExists(filePath);

            // Delete the file metadata from the database
            //profileRepository.delete(profile);
            profile.setProfilePicture(null);
            profileRepository.save(profile);

            return "Profile picture deleted successfully";
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete profile picture", e);
        }
    }

    public void detachUser(User user) {
        // This will detach the entity from the persistence context, so any changes won't be tracked
        entityManager.detach(user);
    }

    public void saveUser(User user) {
        // This will merge the entity back into the persistence context and persist changes
        entityManager.merge(user);
    }


    //To change the password
    public User changePassword(String email, String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.save(user);
        } else {
            // Handle the case where the user is not found
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }
    }

    //To return the user by the email
    public User searchByEmail(String email){
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()){
            return userOpt.get();
        }
        else {
            // Handle the case where the user is not found
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }
    }
}
