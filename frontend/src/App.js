import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const handleBackToHome = () => {
    setIsQuizStarted(false);
  };

  return (
    <div className="App">
      {!isQuizStarted ? (
        <Home onStartQuiz={handleStartQuiz} />
      ) : (
        <Quiz onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
