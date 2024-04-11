import React, { useState, useEffect } from 'react';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch quiz questions from the back-end API
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);
  

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer('');
  };

  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <>
          <h2>{questions[currentQuestionIndex].question}</h2>
          {questions[currentQuestionIndex].options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                id={option}
                value={option}
                checked={userAnswer === option}
                onChange={handleAnswerChange}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <div>
          <h2>Final Score: {score}/{questions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;