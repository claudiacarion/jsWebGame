let currentRound = 1;
let gameOver = false;
let sequence = [];
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const playGame = () => {
  sequence = [];
  currentRound = 1;
  showSequence();
};

const showSequence = () => {
  for (let i = 0; i < currentRound; i++) {
    let randomIndex = Math.floor(Math.random() * NUMBERS.length);
    sequence.push(NUMBERS[randomIndex]);
  }

  let messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = `
    <div class="sequence">Remember this sequence: ${sequence.join(" ")}</div>
    <button class="ready-btn">I'm ready!</button>
  `;

  document.querySelector(".ready-btn").onclick = () => {
    messageContainer.classList.add("hide");
    userInput();
  };
};

const userInput = () => {
  let inputContainer = document.querySelector(".input-container");
  inputContainer.classList.remove("hide");
  inputContainer.innerHTML = `
    <label for="user-input">Enter the sequence:</label>
    <input id="user-input" class="input">
    <button class="submit-btn">Submit!</button>
  `;

  let submit = document.querySelector(".submit-btn");
  submit.onclick = () => {
    inputContainer.classList.add("hide");
    compare();
  };

  document.querySelector("#user-input").addEventListener("keypress", e => {
    if (e.key == "Enter") submit.click();
  });
};

const compare = () => {
  let inputValue = document.querySelector("#user-input").value;
  let userArray = inputValue.replace(/\s+/g, "").split("").map(Number);

  const results = document.querySelector(".results-container");
  
  const showError = (message) => {
    results.innerHTML = `<div class="error-message">${message}</div>`;
    setTimeout(() => results.innerHTML = "", 1500);
    document.querySelector(".input-container").classList.remove("hide");
  };

  if (userArray.some(number => Number.isNaN(number))) {
    showError("Enter numbers only.");
    return;
  }

  if (userArray.length !== sequence.length) {
    showError(`Enter ${sequence.length} digit(s).`);
    return;
  }

  const match = (a, b) => {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  if (match(userArray, sequence)) {
    correct();
  } else {
    lose();
  }
};

const correct = () => {
  currentRound++;
  let correctMessage = document.createElement("div");
  correctMessage.innerHTML = `
    <div class="results-message">You got it! The answer was ${sequence.join(" ")}. Ready for the next round?</div>
    <button class="next-btn">Next</button>
    `;
  document.querySelector(".results-container").appendChild(correctMessage);

  document.querySelector(".next-btn").onclick = () => {
    document.querySelector(".message-container").classList.remove("hide");
    document.querySelector(".results-container").textContent = "";
    showSequence();
  };

  if (currentRound >= 4) win();
};

const win = () => {
  document.querySelector(".game-play").classList.add("hide");
  let winMessage = document.createElement("div");
  winMessage.classList.add("win-message");
  winMessage.textContent = "Wow! Impressive memory! You win!";
  document.querySelector(".main-content").appendChild(winMessage);
  gameOver = true;
};

const lose = () => {
  gameOver = true;
  let gameOverMessage = document.createElement("div");
  gameOverMessage.innerHTML = `
    <div class="results-message">Whoops! The answer was ${sequence.join(" ")}.</div>
    <div class="results-message">Click RESTART to play again!</div>
    `;
  document.querySelector(".results-container").appendChild(gameOverMessage);
};

const start = document.querySelector(".start-btn");
start.onclick = () => {
  if (start.textContent === "START!") {
    playGame();
    start.textContent = "RESTART!";
  } else {
    reset();
  }
};

const reset = () => {
  if (!gameOver) return;

  currentRound = 1;
  sequence = [];
  gameOver = false;

  const message = document.querySelector(".message-container");
  message.innerHTML = "";
  message.classList.remove("hide");

  const results = document.querySelector(".results-container");
  results.innerHTML = "";

  const input = document.querySelector(".input-container");
  input.innerHTML = "";
  input.classList.remove("hide");

  document.querySelector(".game-play").classList.remove("hide");

  const winMessage = document.querySelector(".win-message");
  if (winMessage) winMessage.remove();

  playGame();
};
