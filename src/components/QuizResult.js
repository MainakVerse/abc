const QuizResult = ({ answers }) => {
  const correctCount = answers.filter(Boolean).length;
  const totalQuestions = answers.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="card">
      <div className="results-container">
        <div className="score">{percentage}%</div>
        <p className="score-text">
          You answered {correctCount} out of {totalQuestions} questions correctly
        </p>
        
        <div className="stats-grid">
          <div className="stat-card correct">
            <div className="stat-value">{correctCount}</div>
            <div className="stat-label">Correct</div>
          </div>
          <div className="stat-card incorrect">
            <div className="stat-value">
              {totalQuestions - correctCount}
            </div>
            <div className="stat-label">Incorrect</div>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="button"
        >
          Start New Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
