package team2.ingstagram.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    private String username;
    private String name;
    private String email;
    private String password;
    private Date birthdate;
    private String photo;
    private String bio;
    private String sex;
    @CreationTimestamp
    private Date rdate;
}
