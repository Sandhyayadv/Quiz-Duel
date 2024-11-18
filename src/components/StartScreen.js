import React from "react";

function StartScreen({ onStart }) {
  return (
    <div id="start-screen">
      <h1>Welcome to the Trivia Challenge!</h1>
      <button class="lets-go" onClick={onStart}>
        Start{" "}
      </button>
    </div>
  );
}

export default StartScreen;
