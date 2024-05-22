package team2.ingstagram.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(
        name = "DM_SEQ_GENERATOR",
        sequenceName = "DM_SEQ",
        allocationSize = 1
)
public class DM {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="DM_SEQ_GENERATOR")
    private long dmid;
    private String sender;
    private String receiver;
}
