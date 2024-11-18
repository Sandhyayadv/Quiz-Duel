import React from "react";

function Results({ player1, player2, scores }) {
  const winner =
    scores[player1] === scores[player2]
      ? "It's a tie!"
      : scores[player1] > scores[player2]
      ? player1 + "  Wins!"
      : player2 + "  Wins!";

  return (
    <div class="results">
      <h2>Game Over</h2>
      <b>
        {player1} : {scores[player1]} points VS {player2} : {scores[player2]}{" "}
        points.
        <br />
        <br />
        {winner}
      </b>
    </div>
  );
}

export default Results;
