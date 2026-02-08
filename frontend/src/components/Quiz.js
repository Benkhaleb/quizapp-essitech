import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Results from './Results';
import './Quiz.css';

function Quiz({ onBackToHome }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const API_BASE_URL = 'http://localhost:8080/api/quiz';

  // Charger les questions au démarrage
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_BASE_URL);
      setQuestions(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des questions. Vérifiez que le backend est lancé.');
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerId) => {
    setUserAnswers({
      ...userAnswers,
      [questions[currentQuestionIndex].id]: answerId
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/submit`, {
        answers: userAnswers
      });
      setResult(response.data);
      setIsSubmitted(true);
    } catch (err) {
      alert('Erreur lors de la soumission du quiz. Veuillez réessayer.');
    }
  };

  const isCurrentQuestionAnswered = () => {
    return userAnswers[questions[currentQuestionIndex]?.id] !== undefined;
  };

  const getAnsweredCount = () => {
    return Object.keys(userAnswers).length;
  };

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="loading">Chargement des questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error-message">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={onBackToHome} className="back-button">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted && result) {
    return <Results result={result} onRestart={onBackToHome} />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>QuizApp</h1>
        <div className="progress-info">
          <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
          <span>Réponses : {getAnsweredCount()}/{questions.length}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Question
        question={currentQuestion}
        selectedAnswer={userAnswers[currentQuestion.id]}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="nav-button prev-button"
        >
          ← Précédent
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="nav-button submit-button"
            disabled={getAnsweredCount() !== questions.length}
          >
            Terminer et voir les résultats
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="nav-button next-button"
          >
            Suivant →
          </button>
        )}
      </div>

      {getAnsweredCount() !== questions.length && currentQuestionIndex === questions.length - 1 && (
        <div className="warning-message">
          Veuillez répondre à toutes les questions avant de soumettre le quiz.
        </div>
      )}
    </div>
  );
}

export default Quiz;
