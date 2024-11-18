import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import PlayerSetup from "./components/PlayerSetup";
import QuestionArea from "./components/QuestionArea";
import PlayAgain from "./components/PlayAgain";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [step, setStep] = useState("start");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [scores, setScores] = useState({});
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [categoriesUsed, setCategoriesUsed] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories.slice(0, 6));
      setAvailableCategories(data.trivia_categories.slice(0, 6));
    };

    fetchCategories();
  }, []);

  const fetchQuestions = async (categoryId) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=6&category=${categoryId}&type=multiple`
    );
    const data = await response.json();
    return data.results;
  };

  const handleStartGame = () => setStep("setup");

  const handleConfirmCategory = async () => {
    const questions = await fetchQuestions(selectedCategory);
    setCategoriesUsed([parseInt(selectedCategory)]);
    setCurrentPlayer(player1);
    setScores({ [player1]: 0, [player2]: 0 });
    setQuestions(questions);
    setCurrentQuestionIndex(0); // Reset the question index
    setCurrentDifficulty("easy"); // Ensure difficulty starts as "easy"
    setStep("quiz");
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + getPoints(),
      }));
    }

    setCurrentPlayer((prev) => (prev === player1 ? player2 : player1));
    setCurrentQuestionIndex((prev) => prev + 1);

    if (currentQuestionIndex + 1 >= questions.length) {
      handleShowPlayAgain();
    } else {
      updateDifficulty();
    }
  };

  const handleShowPlayAgain = () => {
    setAvailableCategories(
      categories.filter((category) => !categoriesUsed.includes(category.id))
    );

    if (categoriesUsed.length >= 6) setStep("results");
    else setStep("play-again");
  };

  const handleStartNewGame = async () => {
    const questions = await fetchQuestions(selectedCategory);
    setCategoriesUsed((prev) => [...prev, parseInt(selectedCategory)]);
    setQuestions(questions);
    setCurrentQuestionIndex(0); // Reset the question index
    setCurrentDifficulty("easy"); // Reset the difficulty to "easy"
    setStep("quiz");
  };

  const updateDifficulty = () => {
    const nextIndex = currentQuestionIndex + 1;
    setCurrentDifficulty(
      nextIndex < 2 ? "easy" : nextIndex < 4 ? "medium" : "hard"
    );
  };

  const getPoints = (difficulty) => {
    return difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20;
  };

  const handleShowResults = () => setStep("results");

  return (
    <div className="App">
      {step === "start" && <StartScreen onStart={handleStartGame} />}
      {step === "setup" && (
        <PlayerSetup
          categories={categories}
          player1={player1}
          player2={player2}
          onChangePlayer1={setPlayer1}
          onChangePlayer2={setPlayer2}
          onCategoryChange={setSelectedCategory}
          onConfirm={handleConfirmCategory}
        />
      )}
      {step === "quiz" && (
        <QuestionArea
          question={questions[currentQuestionIndex]}
          currentPlayer={currentPlayer}
          currentDifficulty={currentDifficulty}
          points={getPoints(currentDifficulty)}
          onAnswer={handleAnswer}
        />
      )}
      {step === "play-again" && (
        <PlayAgain
          availableCategories={availableCategories}
          onCategoryChange={setSelectedCategory}
          onPlayAgain={handleStartNewGame}
          onEndGame={handleShowResults}
        />
      )}
      {step === "results" && (
        <Results player1={player1} player2={player2} scores={scores} />
      )}
    </div>
  );
}

export default App;
