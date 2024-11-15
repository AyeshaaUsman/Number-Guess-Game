
var targetNumber = 0;
var attempts = 0;
var maxRange = 0;

var difficultyButtons = document.querySelectorAll(".difficulty-button");
var gameArea = document.getElementById("game-area");
var guessInput = document.getElementById("guess-input");
var guessButton = document.getElementById("guess-button");
var feedback = document.getElementById("feedback");
var attemptsDisplay = document.getElementById("attempts");
var restartButton = document.getElementById("restart-button");

function startGame(range) {
  maxRange = range;
  targetNumber = Math.floor(Math.random() * maxRange) + 1;
  attempts = 0;

  feedback.textContent = "";
  attemptsDisplay.textContent = attempts;
  guessInput.value = "";

  gameArea.style.display = "block";
  restartButton.style.display = "none";
  guessButton.disabled = false;

  console.log("Target number (debug): " + targetNumber);
}

function handleGuess() {
  var guess = Number(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > maxRange) {
    feedback.textContent = "Please enter a valid number between 1 and " + maxRange + ".";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess < targetNumber) {
    feedback.textContent = "Too low! Try again.";
    feedback.style.color = "orange";
  } else if (guess > targetNumber) {
    feedback.textContent = "Too high! Try again.";
    feedback.style.color = "orange";
  } else {
    feedback.textContent = "Congratulations! You guessed the number in " + attempts + " attempts.";
    feedback.style.color = "green";
    guessButton.disabled = true;
    restartButton.style.display = "inline-block";
  }

  guessInput.value = "";
}

function restartGame() {
  gameArea.style.display = "none";
  feedback.textContent = "";
}

for (var i = 0; i < difficultyButtons.length; i++) {
  difficultyButtons[i].addEventListener("click", function () {
    var range = Number(this.getAttribute("data-range"));
    startGame(range);
  });
}

guessButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", restartGame);
