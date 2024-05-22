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
        name = "SEARCH_SEQ_GENERATOR",
        sequenceName = "SEARCH_SEQ",
        allocationSize = 1
)
public class SearchList {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="SEQRCH_SEQ_GENERATOR")
    private long searchid;
    @CreationTimestamp
    private Date rdate;
    private String content;
    private String username;
}
