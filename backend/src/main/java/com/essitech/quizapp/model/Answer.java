package com.essitech.quizapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "answer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 300)
    private String answerText;
    
    @Column(nullable = false)
    private Boolean isCorrect;
    
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @JsonIgnore
    private Question question;
}
