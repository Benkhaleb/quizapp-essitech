import React from "react";
import "./Results.css";

function Results({ result, onRestart }) {
  const percentage = ((result.score / result.totalQuestions) * 100).toFixed(1);

  const getScoreClass = () => {
    if (percentage >= 80) return "excellent";
    if (percentage >= 60) return "good";
    if (percentage >= 40) return "average";
    return "poor";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent travail ! ";
    if (percentage >= 60) return "Bon travail ! ";
    if (percentage >= 40) return "Pas mal, continuez à vous améliorer ! ";
    return "Vous devriez réviser davantage ! ";
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <h1>Résultats du Quiz</h1>

        <div className={`score-circle ${getScoreClass()}`}>
          <div className="score-content">
            <div className="score-value">
              {result.score}/{result.totalQuestions}
            </div>
            <div className="score-percentage">{percentage}%</div>
          </div>
        </div>

        <h2 className="score-message">{getScoreMessage()}</h2>

        <div className="score-details">
          <div className="detail-item correct">
            <span className="detail-label">Réponses correctes</span>
            <span className="detail-value">{result.score}</span>
          </div>
          <div className="detail-item incorrect">
            <span className="detail-label">Réponses incorrectes</span>
            <span className="detail-value">
              {result.totalQuestions - result.score}
            </span>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart}>
          Recommencer le Quiz
        </button>
      </div>
    </div>
  );
}

export default Results;
