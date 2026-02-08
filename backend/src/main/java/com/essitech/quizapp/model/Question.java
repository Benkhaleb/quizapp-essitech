package com.essitech.quizapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "question")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 500)
    private String questionText;
    
    @Column(nullable = false, length = 100)
    private String category;
    
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Answer> answers = new ArrayList<>();
}
