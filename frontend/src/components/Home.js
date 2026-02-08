import React from 'react';
import './Home.css';

function Home({ onStartQuiz }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Bienvenue sur QuizApp</h1>
        <p>Testez vos connaissances techniques avec notre quiz interactif !</p>
        <p className="info-text">
          Ce quiz contient 10 questions sur différents sujets : 
          ReactJS, Java, Spring Boot, SQL, JavaScript et PostgreSQL.
        </p>
        <button className="start-button" onClick={onStartQuiz}>
          Démarrer le Quiz
        </button>
      </div>
    </div>
  );
}

export default Home;
