import React from 'react';
import './Question.css';

function Question({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="question-card">
      <div className="question-header">
        <span className="category-badge">{question.category}</span>
        <h2 className="question-text">{question.questionText}</h2>
      </div>
      
      <div className="answers-container">
        {question.answers.map((answer) => (
          <div
            key={answer.id}
            className={`answer-option ${selectedAnswer === answer.id ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(answer.id)}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              checked={selectedAnswer === answer.id}
              onChange={() => onAnswerSelect(answer.id)}
            />
            <label>{answer.answerText}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
