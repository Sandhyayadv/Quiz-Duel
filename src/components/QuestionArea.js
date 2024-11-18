import React from "react";

function QuestionArea({
  question,
  currentPlayer,
  currentDifficulty,
  points,
  onAnswer,
}) {
  if (!question) return null;

  const shuffledAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div class="question-area">
      <h2>Level : {currentDifficulty}</h2>
      <h2>Current Turn : {currentPlayer}</h2>
      <p>Marks for this question: {points}</p>
      <h2>{question.question}</h2>
      <div id="answer-options">
        {shuffledAnswers.map((answer) => (
          <button
            key={answer}
            onClick={() => onAnswer(answer === question.correct_answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionArea;
