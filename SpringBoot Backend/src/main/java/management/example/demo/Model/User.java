package management.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import management.example.demo.enums.Role;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true) // Ensures the username is unique in the database
    private String username;

    private String name;
    private String email;
    private String password;
    private String contactNumber;


    //To handle the role-based access
//    @ElementCollection(fetch = FetchType.EAGER)
//    @Enumerated(EnumType.STRING)
//    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
//    @Column(name = "role")
//    //@org.hibernate.annotations.Immutable
//    private Set<Role> roles = new HashSet<>();
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<Role> roles;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonManagedReference  // Prevent recursive serialization of Notifications
//    private List<Notification> notifications;

    // Relationships
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Event> events;

    public User() {

    }

    public User(String username, String name, String email, String password, Set<Role> roles) {
        super();
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", pwd='" + password + '\'' +
                '}';
    }


    public void addRole(Role role) {
        this.roles.add(role);
    }

    public void removeRole(Role role) {
        this.roles.remove(role);
    }

}


/*
* NOTES:
* cascade
The cascade attribute defines which operations should be cascaded from the parent entity to the associated entities. The CascadeType enum includes the following options:

ALL: Applies all cascade operations (persist, merge, remove, refresh, detach).
PERSIST: When the parent entity is persisted, the related entities are also persisted.
MERGE: When the parent entity is merged, the related entities are also merged.
REMOVE: When the parent entity is removed, the related entities are also removed.
REFRESH: When the parent entity is refreshed, the related entities are also refreshed.
DETACH: When the parent entity is detached, the related entities are also detached.
* */
