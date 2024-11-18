import React, { useState } from "react";

function PlayerSetup({
  categories,
  player1,
  player2,
  onChangePlayer1,
  onChangePlayer2,
  onCategoryChange,
  onConfirm,
}) {
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (
      !player1.trim() ||
      !player2.trim() ||
      !document.getElementById("category").value
    ) {
      setError("Please fill in both player names and select a category.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setError("");
    onConfirm();
  };

  return (
    <div className="player-setup">
      <input
        id="input1"
        type="text"
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => onChangePlayer1(e.target.value)}
      />
      <input
        id="input2"
        type="text"
        placeholder="Player 2 Name"
        value={player2}
        onChange={(e) => onChangePlayer2(e.target.value)}
      />
      <select id="category" onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>} {}
      <button onClick={handleConfirm}>Play</button>
    </div>
  );
}

export default PlayerSetup;
