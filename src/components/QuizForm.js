import React, { useState } from "react";

const QuizForm = ({ onStartQuiz }) => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      await onStartQuiz(topic);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="title">Generate A Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic" className="label">
            Select Topic
          </label>
          <input
            id="topic"
            type="text"
            className="input"
            placeholder="Enter a topic (why not about your favourite film?)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button 
  type="submit" 
  className="button"
  disabled={isLoading}
  style={{ 
    background: isLoading ? 'linear-gradient(to right, gray, darkgray)' : 'linear-gradient(to right, black, darkblue)'
  }}
>
  {isLoading ? "Creating Quiz..." : "Start Quiz"}
</button>
      </form>
  <p className="pt-4 text-center">Made with 💙 by Mainak</p>
    </div>
  );
};

export default QuizForm;
