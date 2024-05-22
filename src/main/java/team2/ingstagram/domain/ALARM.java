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
        name = "ALARM_SEQ_GENERATOR",
        sequenceName = "ALARM_SEQ",
        allocationSize = 1
)
public class ALARM {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="ALARM_SEQ_GENERATOR")
    private long alarmid;
    private String fromuser;
    private String touser;
    private String content;
}
