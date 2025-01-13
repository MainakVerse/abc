import React, { useState } from "react";

const QuizQuestions = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) {
      setErrorMessage("Please mark an option.");
      return;
    }
    setErrorMessage(null); // Clear the error message when an option is selected

    if (showCorrectAnswer) {
      const newAnswers = [...answers, selectedOption.isCorrect];
      setAnswers(newAnswers);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setShowCorrectAnswer(false);
      } else {
        onComplete(newAnswers);
      }
    } else {
      setShowCorrectAnswer(true);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="card">
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">
          Question {currentIndex + 1} / {questions.length}
        </p>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <h3 className="question">{currentQuestion.question}</h3>
      
      <div className="options-grid">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedOption === option ? 'selected' : ''
            } ${
              showCorrectAnswer && option.isCorrect
                ? 'correct'
                : showCorrectAnswer && selectedOption === option && !option.isCorrect
                ? 'incorrect'
                : ''
            }`}
            onClick={() => handleAnswer(option)}
            disabled={showCorrectAnswer}
          >
            {option.text}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="button"
        style={{ marginTop: '1.5rem' }}
      >
        {showCorrectAnswer
          ? currentIndex === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"
          : "Check Answer"}
      </button>
    </div>
  );
};

export default QuizQuestions;
