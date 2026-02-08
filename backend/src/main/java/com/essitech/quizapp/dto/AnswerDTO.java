package com.essitech.quizapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTO {
    private Long id;
    private String answerText;
    // isCorrect est omis intentionnellement pour ne pas exposer la réponse correcte
}
