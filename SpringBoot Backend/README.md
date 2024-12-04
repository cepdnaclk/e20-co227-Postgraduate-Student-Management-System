# Postgraduate-Student-Management-System_Backend
The Postgraduate Student Management System (PGSMS) backend is a RESTful API developed using Spring Boot. It serves as the core of the application, managing data and business logic, and providing secure endpoints for the frontend to interact with.

### Features

- Student Management
- Staff Management
- Research and Submissions
- Email Notification System
- Authentication and Authorization

### Technologies Used

 Framework: Spring Boot <br>
 Database: MySQL <br>
 Security: Spring Security with JWT for authentication and encrypted password storage. <br>
 Build Tool: Maven <br>

## Setup Instructions

__Prerequisites__

Java 17 or above installed. <br>
MySQL Database installed and running. <br>

__Installation Steps__

Clone the repository:

```
git clone https://github.com/your-repository-url.git
cd pgsms-backend
```

Configure the application properties:

Edit the application.properties file located in src/main/resources to set up the database and email configurations:

```
spring.datasource.url=jdbc:mysql://localhost:3306/pgsms
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email
spring.mail.password=app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.default-encoding=UTF-8
```

Build and run the application:

```
mvn clean install
mvn spring-boot:run
```

Access the API at http://localhost:8080.

### Key Endpoints

| HTTP Method   | Endpoint      | Description |
| ------------- | ------------- | ----------- |
| POST          | /enroll       | Enroll a new student. |
| POST          | /login  | Login to the system. |

### Security Features

- Authentication:
Implemented using JWT tokens, ensuring secure login and session management.<br>
- Password Encryption:
All passwords are hashed and stored securely.<br>
- Role-Based Access Control:
Each API endpoint is secured based on user roles (admin, staff, student).<br>
