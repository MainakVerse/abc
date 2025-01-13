  import React, { useState } from "react";
  import { fetchQuizQuestions } from "./api";
  import QuizForm from "./components/QuizForm";
  import QuizQuestions from "./components/QuizQuestions";
  import QuizResult from "./components/QuizResult";
  import './App.css';


  const App = () => {
    const [questions, setQuestions] = useState([]);
    const [quizState, setQuizState] = useState("form");
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState(null);

    const startQuiz = async (topic) => {
      try {
        setError(null);
        const quizData = await fetchQuizQuestions(topic);
        setQuestions(quizData);
        setQuizState("quiz");
      } catch (error) {
        setError(error.message);
      }
    };

    const completeQuiz = (userAnswers) => {
      setAnswers(userAnswers);
      setQuizState("result");
    };

    return (
      <div className="container">
        <div className="logo-container">
          <img
            src="/quizfy.png"
            alt="Quizfy Logo"
            className="logo"
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {quizState === "form" && <QuizForm onStartQuiz={startQuiz} />}
        {quizState === "quiz" && (
          <QuizQuestions 
            questions={questions} 
            onComplete={completeQuiz} 
          />
        )}
        {quizState === "result" && <QuizResult answers={answers} />}
      </div>
    );
  };

  export default App;