function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const result = options[Math.floor(Math.random() * options.length)];
  return result;
}

let playerScore = 0;
let computerScore = 0;

function hasPlayerWonTheRound(player, computer) {
  if (player === "Rock" && computer === "Scissors") {
    return true;
  } else if (player === "Scissors" && computer === "Paper") {
    return true;
  } else if (player === "Paper" && computer === "Rock") {
    return true;
  } else {
    return false;
  }
}

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();
  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore += 1;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (userOption === computerResult) {
    return `It's a tie! Both chose ${userOption}`;
  } else if (!hasPlayerWonTheRound(userOption, computerResult)) {
    computerScore += 1;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resultsContainer = document.querySelector(".results-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
  const message = getRoundResults(userOption);
  roundResultsMsg.innerText = message;
  resultsContainer.style.display = message ? "block" : "none";
  roundResultsMsg.classList.remove("reveal");
  // trigger reflow to restart animation
  void roundResultsMsg.offsetWidth;
  roundResultsMsg.classList.add("reveal");
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  // bump the score that changed
  if (message.startsWith("Player wins!")) {
    playerScoreSpanElement.classList.remove("bump");
    void playerScoreSpanElement.offsetWidth;
    playerScoreSpanElement.classList.add("bump");
  } else if (message.startsWith("Computer wins!")) {
    computerScoreSpanElement.classList.remove("bump");
    void computerScoreSpanElement.offsetWidth;
    computerScoreSpanElement.classList.add("bump");
  }

  if (playerScore >= 3 || computerScore >= 3) {
    winnerMsgElement.innerText = `${
      playerScore >= 3 ? "Player" : "Computer"
    } has won the game!`;
    winnerMsgElement.classList.remove("glow");
    void winnerMsgElement.offsetWidth;
    winnerMsgElement.classList.add("glow");

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
  showResults("Rock");
});
paperBtn.addEventListener("click", function () {
  showResults("Paper");
});
scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;
  optionsContainer.style.display = "block";
  resetGameBtn.style.display = "none";
  roundResultsMsg.innerText = "";
  resultsContainer.style.display = "none";
  winnerMsgElement.innerText = "";
}

resetGameBtn.addEventListener("click", function () {
  resetGame();
});
