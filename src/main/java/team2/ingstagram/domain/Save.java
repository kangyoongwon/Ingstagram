package team2.ingstagram.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(
        name = "SAVE_SEQ_GENERATOR",
        sequenceName = "SAVE_SEQ",
        allocationSize = 1
)
public class Save {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SAVE_SEQ_GENERATOR")
    private long saveid;
    @CreationTimestamp
    private Date rdate;
    private long id;
    private String username;
}
