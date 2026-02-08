package com.essitech.quizapp.service;

import com.essitech.quizapp.dto.*;
import com.essitech.quizapp.model.Answer;
import com.essitech.quizapp.model.Question;
import com.essitech.quizapp.repository.AnswerRepository;
import com.essitech.quizapp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuizService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private AnswerRepository answerRepository;
    
    /**
     * Récupère toutes les questions du quiz sans exposer les bonnes réponses
     */
    public List<QuestionDTO> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        
        return questions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convertit une Question en QuestionDTO (sans exposer isCorrect)
     */
    private QuestionDTO convertToDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setQuestionText(question.getQuestionText());
        dto.setCategory(question.getCategory());
        
        List<AnswerDTO> answerDTOs = question.getAnswers().stream()
                .map(answer -> new AnswerDTO(answer.getId(), answer.getAnswerText()))
                .collect(Collectors.toList());
        
        dto.setAnswers(answerDTOs);
        return dto;
    }
    
    /**
     * Calcule le score en comparant les réponses de l'utilisateur avec les bonnes réponses
     */
    public QuizResultDTO calculateScore(QuizSubmissionDTO submission) {
        Map<Long, Long> userAnswers = submission.getAnswers();
        int correctAnswers = 0;
        int totalQuestions = userAnswers.size();
        
        for (Map.Entry<Long, Long> entry : userAnswers.entrySet()) {
            Long questionId = entry.getKey();
            Long selectedAnswerId = entry.getValue();
            
            // Récupérer la réponse sélectionnée
            Answer selectedAnswer = answerRepository.findById(selectedAnswerId).orElse(null);
            
            if (selectedAnswer != null && selectedAnswer.getIsCorrect()) {
                correctAnswers++;
            }
        }
        
        String message = String.format("Votre score : %d/%d", correctAnswers, totalQuestions);
        return new QuizResultDTO(correctAnswers, totalQuestions, message);
    }
}
