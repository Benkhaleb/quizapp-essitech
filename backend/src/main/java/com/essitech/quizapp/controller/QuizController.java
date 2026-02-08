package com.essitech.quizapp.controller;

import com.essitech.quizapp.dto.QuestionDTO;
import com.essitech.quizapp.dto.QuizResultDTO;
import com.essitech.quizapp.dto.QuizSubmissionDTO;
import com.essitech.quizapp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    /**
     * GET /api/quiz
     * Retourne toutes les questions du quiz (sans les bonnes réponses)
     */
    @GetMapping
    public ResponseEntity<List<QuestionDTO>> getQuiz() {
        List<QuestionDTO> questions = quizService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }
    
    /**
     * POST /api/quiz/submit
     * Reçoit les réponses de l'utilisateur et retourne le score
     */
    @PostMapping("/submit")
    public ResponseEntity<QuizResultDTO> submitQuiz(@RequestBody QuizSubmissionDTO submission) {
        QuizResultDTO result = quizService.calculateScore(submission);
        return ResponseEntity.ok(result);
    }
}
