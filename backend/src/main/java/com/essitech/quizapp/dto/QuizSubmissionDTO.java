package com.essitech.quizapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizSubmissionDTO {
    // Map de questionId -> answerId sélectionné par l'utilisateur
    private Map<Long, Long> answers;
}
