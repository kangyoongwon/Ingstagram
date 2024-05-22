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
        name = "IMAGE_SEQ_GENERATOR",
        sequenceName = "IMAGE_SEQ",
        allocationSize = 1
)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IMAGE_SEQ_GENERATOR")
    private long imageid;
    private String path;
    private long id;
}
