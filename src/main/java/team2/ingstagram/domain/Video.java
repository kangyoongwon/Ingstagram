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
        name = "VIDEO_SEQ_GENERATOR",
        sequenceName = "VIDEO_SEQ",
        allocationSize = 1
)
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VIDEO_SEQ_GENERATOR")
    private long videoid;
    private String path;
    private long views;
    private long id;
}
