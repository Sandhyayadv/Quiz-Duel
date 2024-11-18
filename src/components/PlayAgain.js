import React, { useState } from "react";

function PlayAgain({
  availableCategories,
  onCategoryChange,
  onPlayAgain,
  onEndGame,
}) {
  const [error, setError] = useState("");

  const handlePlayAgain = () => {
    const selectedCategory = document.querySelector("select").value;
    if (!selectedCategory) {
      setError("Please select a category before proceeding.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setError("");
    onPlayAgain();
  };

  return (
    <div className="play-again">
      <h2>Would you like to play again?</h2>
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Select a category</option>
        {availableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>} {}
      <button onClick={handlePlayAgain}>Play Again</button>
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
}

export default PlayAgain;
