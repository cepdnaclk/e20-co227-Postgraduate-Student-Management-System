package management.example.demo.config;

import management.example.demo.Service.CustomUserDetailsService;
import management.example.demo.Util.JwtRequestFilter;
import management.example.demo.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Set specific allowed origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // Allow preflight requests
                .requestMatchers("/login", "/signup", "/enroll", "/css/**", "/js/**", "/img/**").permitAll()
                .requestMatchers("/ws/**").permitAll()
                .requestMatchers("/profile/search/**").permitAll()
                .requestMatchers("/profile/change-password").permitAll()
                .requestMatchers("/supervisors").hasAuthority(Role.ADMIN.name())
                //For swagger documentation allow .anyRequest().authenticated() and
                //Call http://localhost:8080/swagger-ui.html
                //.requestMatchers("/swagger-ui.html", "/swagger-ui/**").permitAll()
                //.requestMatchers("/v3/api-docs").permitAll()
                .anyRequest().authenticated()
                //.anyRequest().permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler()) // Return HTTP 200 on logout success
                .permitAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder())
                .and()
                .build();
    }

}





//import management.example.demo.Service.CustomUserDetailsService;
//import management.example.demo.Util.JwtRequestFilter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Autowired
//    private CustomUserDetailsService customUserDetailsService;
//
//    @Bean
//    public static PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Set specific allowed origin
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .cors().configurationSource(corsConfigurationSource())
//                .and()
//                .authorizeHttpRequests()
//                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                .requestMatchers("/signup", "/enroll", "/enrolledstu", "/students", "/welcome", "/dashboard", "/upload", "/handleApproval/**",
//                        "/assignSupervisor/**", "/addSubmitSection/**","/css/**", "/js/**", "/img/**").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .addFilterBefore(jwtRequestFilter(), UsernamePasswordAuthenticationFilter.class)
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                );
//
//        return http.build();
//    }
//
//    @Bean
//    public JwtRequestFilter jwtRequestFilter() {
//        return new JwtRequestFilter();
//    }
//
//}
//import org.springframework.web.cors.CorsConfigurationSource;
//


//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Set specific allowed origin
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }





//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .cors().configurationSource(corsConfigurationSource())
//                .and()
//                .authorizeHttpRequests()
//
//                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // Allow preflight requests
//                .requestMatchers("/signup", "/enroll", "/enrolledstu", "/students", "/welcome", "/dashboard", "/upload", "/handleApproval/**", "/assignSupervisor/**", "/addSubmitSection/**",
//
//                        "/css/**", "/js/**", "/img/**").permitAll()
////                .requestMatchers("/home").permitAll()
////                .requestMatchers("/supervisors").hasAuthority(Role.ADMIN.name())
////                .requestMatchers("/notifications/**").authenticated()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginProcessingUrl("/login")
////                .successHandler((request, response, authentication) -> {
////                    String roles = authentication.getAuthorities().stream()
////                            .map(GrantedAuthority::getAuthority)
////                            .collect(Collectors.joining(","));
////                    response.setContentType("text/plain");
////                    response.getWriter().write(roles);
////                })
//                .permitAll()
//                .and()
//                .logout()
//                .logoutUrl("/api/logout")
//                .invalidateHttpSession(true)
//                .clearAuthentication(true)
////                .deleteCookies("JSESSIONID")
////                .logoutSuccessHandler((request, response, authentication) -> {
////                    response.setContentType("application/json");
////                    response.getWriter().write("{\"message\": \"Logout successful\"}");
////                    response.setStatus(HttpServletResponse.SC_OK);
////                })
//                .permitAll()
//                .and()
////                .sessionManagement(session -> session
////                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)  // Ensure sessions are always created
////                        .sessionFixation().migrateSession()  // Migrate session to avoid session fixation attacks
////                        .maximumSessions(1)
////                        .maxSessionsPreventsLogin(true)
////                        .expiredUrl("/login?expired")
////                )
//                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//        ;
//
//        return http.build();
//    }





















//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .cors().and()
//                .authorizeHttpRequests()
//                .requestMatchers("/signup", "/enroll" , "/welcome", "/dashboard","/upload", "/enrolledstu", "/handleApproval/**","/assignSupervisor/**", "/addSubmitSection/**",
//                        "/css/**", "/js/**", "/img/**").permitAll()
//                .requestMatchers("/home").permitAll()
////                .requestMatchers("/admin/**").hasAuthority(Role.ADMIN.name())
////                .requestMatchers("/student/**").hasAuthority(Role.STUDENT.name())
////                .requestMatchers("/teacher/**").hasAuthority(Role.SUPERVISOR.name())
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/login")
//                .loginProcessingUrl("/login")
//                //.defaultSuccessUrl("/home", true)
//                .permitAll()
//                .and()
//                .logout()
//                .invalidateHttpSession(true)
//                .clearAuthentication(true)
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                .logoutSuccessUrl("/login?logout").permitAll();
//
//        return http.build();
//    }
//
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
//    }




























//
//import management.example.demo.Service.LoginService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Autowired
//    private LoginService customUserDetailsService;
//
//    @Bean
//    public static PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(authorizeRequests ->
//                        authorizeRequests
//                                .requestMatchers("/signup","/enroll", "/login","/Enrolledstu", "/css/**", "/js/**" , "/img/**" ).permitAll()
//                                .anyRequest().authenticated()
//                )
//                .formLogin(formLogin ->
//                        formLogin
//                                .loginPage("/login")
//                                .defaultSuccessUrl("/home", true)
//                                .permitAll()
//                )
//                .logout(logout ->
//                        logout
//                                .logoutUrl("/logout")
//                                .logoutSuccessUrl("/login?logout")
//                )
//                .csrf(AbstractHttpConfigurer::disable);
//
//        return http.build();
//    }
//
//
//
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
//    }
//}



//    @Bean
//    public DaoAuthenticationProvider authProvider() {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(userDetailsService);
//        authProvider.setPasswordEncoder(passwordEncoder());
//        System.out.println("AuthProvider Configured with PasswordEncoder: " + passwordEncoder());
//        return authProvider;
//    }



/*
Permitting Specific URLs:

.requestMatchers("/login", "/signup", "/enroll").permitAll() allows unauthenticated users to access the /login, /signup, and /enroll URLs.
Custom Login Page:

.formLogin(formLogin -> formLogin.loginPage("/login").permitAll()) specifies a custom login page located at /login and permits all users to access it.
Logout Configuration:

.logout(logout -> logout.permitAll()) allows all users to access the logout functionality.
*/


/* .logout(logout ->
                        logout
                                .logoutUrl("/logout")
                                .logoutSuccessUrl("/login?logout")
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID")
                                */
