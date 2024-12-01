package management.example.demo.config;

import lombok.Getter;
import lombok.Setter;
import management.example.demo.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;


@Getter
@Setter
public class CustomUserDetails implements UserDetails {

    private Long userId;
    private String username;
    private String password;
    private Set<Role> roles;

    public CustomUserDetails(Long userId, String username, String password, Set<Role> roles) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //Create a stream from the 'roles' set;
        return roles.stream()
                //Transform each 'Role' object in the stream into a 'SimpleGrantedAuthority' object
                //role.name(): The name() method of the enum returns the name of the enum constant (ex; 'ADMIN' , 'STUDENT')
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toSet());
    }
    //Reference - https://youtu.be/7lnevNCaTLQ?si=WR34_oonZCS2XUaG
    //SimpleGrantedAuthority is a simple implementation of the GrantedAuthority interface,
    // and it's often used to represent roles or permissions in Spring Security.

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
