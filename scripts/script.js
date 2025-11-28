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
  inputContainer.innerHTML = `
    <label for="user-input">Enter the sequence:</label>
    <input id="user-input" class="input">
    <button class="submit-button">Submit!</button>
  `;

  document.querySelector(".submit-button").onclick = () => {
    let answer = document.querySelector("#user-input").value.trim();
    compare(answer);
  };
};

const compare = () => {
  let inputValue = document.querySelector("#user-input").value;
  let userArray = inputValue.replace(/\s+/g, "").split("").map(Number);

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
  };
};

const correct = () => {

};

const lose = () => {

};

let start = document.querySelector(".start-button");
start.onclick = () => {
  playGame();
  start.textContent = "RESTART!";
};
