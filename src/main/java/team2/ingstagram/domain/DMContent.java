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
        name = "DMCON_SEQ_GENERATOR",
        sequenceName = "DMCON_SEQ",
        allocationSize = 1
)
public class DMContent {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="DMCON_SEQ_GENERATOR")
    private long contentid;
    private String content;
    @CreationTimestamp
    private Date rdate;
    private long dmid;
    private String sender;

}
