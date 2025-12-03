let currentRound = 1;
let gameOver = false;
let sequence = [];
let plays = 0;
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const show = element => element.classList.remove("hide");
const hide = element => element.classList.add("hide");
const empty = element => (element.innerHTML = "");

const playGame = () => {
  sequence = [];
  currentRound = 1;
  showSequence();
};

const counters = () => {
  document.querySelector(".plays").textContent = `Play: ${plays}`;
  document.querySelector(".rounds").textContent = `Round: ${currentRound}`;
};

const showSequence = () => {
  for (let i = 0; i < currentRound; i++) {
    let randomIndex = Math.floor(Math.random() * NUMBERS.length);
    sequence.push(NUMBERS[randomIndex]);
  }

  let messageContainer = document.querySelector(".message-container");
  messageContainer.innerHTML = `
    <div class="sequence-label">Remember this sequence:</div>
    <div class="sequence">${sequence.join(" ")}</div>
    <button class="ready-btn">I'm ready!</button>
  `;

  document.querySelector(".ready-btn").onclick = () => {
    hide(messageContainer);
    userInput();
  };
};

const userInput = () => {
  let inputContainer = document.querySelector(".input-container");
  show(inputContainer);
  inputContainer.innerHTML = `
    <label for="user-input">Enter the sequence:</label>
    <input id="user-input" class="input">
    <button class="submit-btn">Submit!</button>
  `;

  const submit = document.querySelector(".submit-btn");
  submit.onclick = () => {
    hide(inputContainer);
    compare();
  };

  const input = document.querySelector("#user-input");
  input.addEventListener("keypress", e => {
    if (e.key == "Enter") submit.click();
  });
  input.focus();
};

const compare = () => {
  let inputValue = document.querySelector("#user-input").value;
  let userArray = inputValue.replace(/\s+/g, "").split("").map(Number);

  const results = document.querySelector(".results-container");

  const showError = message => {
    results.innerHTML = `<div class="error-message">${message}</div>`;
    setTimeout(() => (results.innerHTML = ""), 1500);
    show(document.querySelector(".input-container"));
  };

  if (userArray.some(number => Number.isNaN(number))) {
    return showError("Enter numbers only.");
  }

  if (userArray.length !== sequence.length) {
    return showError(`Enter ${sequence.length} digit(s).`);
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
  if (currentRound >= 5) {
    win();
    return;
  };

  currentRound++;
  counters();

  let correctMessage = document.createElement("div");
  correctMessage.innerHTML = `
    <div class="results-message">You got it! The answer was</div>
    <div class="sequence">${sequence.join(" ")}</div>
    <div>Ready for the next round?</div>
    <button class="next-btn">Next</button>
    `;
  document.querySelector(".results-container").appendChild(correctMessage);

  document.querySelector(".next-btn").onclick = () => {
    show(document.querySelector(".message-container"));
    empty(document.querySelector(".results-container"));
    showSequence();
  };
};

const win = () => {
  hide(document.querySelector(".game-play"));
  let winMessage = document.createElement("div");
  winMessage.innerHTML = `
    <div class="win-message">
      <div>"Wow! Impressive memory! You win!"</div>
      <img src="./images/heart.png" class="win-image" alt="win image" height="100" width="auto"/>
    </div>
  `;
  document.querySelector(".main-content").appendChild(winMessage);
};

const lose = () => {
  let gameOverMessage = document.createElement("div");
  gameOverMessage.innerHTML = `
    <div class="results-message">Whoops! The answer was</div>
    <div class="sequence">${sequence.join(" ")}</div>
    <div class="results-message">Click RESTART to play again!</div>
    `;
  document.querySelector(".results-container").appendChild(gameOverMessage);
};

const start = document.querySelector(".start-btn");
start.onclick = () => {
  document.querySelector(".header").style.fontSize = "0.8rem";
  hide(document.querySelector(".landing-image"));
  plays++;
  currentRound = 1;
  counters();
  if (start.textContent === "START!") {
    playGame();
    start.textContent = "RESTART!";
  } else {
    reset();
  }
};

const reset = () => {
  currentRound = 1;
  sequence = [];
  gameOver = false;

  const message = document.querySelector(".message-container");
  empty(message);
  show(message);

  const results = document.querySelector(".results-container");
  empty(results);

  const input = document.querySelector(".input-container");
  empty(input);
  show(input);

  show(document.querySelector(".game-play"));

  const winMessage = document.querySelector(".win-message");
  if (winMessage) winMessage.remove();

  playGame();
};

$(() => {
  $(".overlay").delay(2000).fadeOut();
});
