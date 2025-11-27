let currentRound = 1;
let gameOver = false;
let sequence = [];
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const playGame = () => {
  sequence = [];
  currentRound = 1
  showSequence();
};

const showSequence = () => {
  for (let i = 0; i < currentRound; i++) {
    let randomIndex = Math.floor(Math.random() * NUMBERS.length);
    sequence.push(NUMBERS[randomIndex]);
  }

  let sequenceDiv = document.createElement("div");
  sequenceDiv.textContent = `Remember this sequence: ${sequence.join(" ")}`;
  let readyButton = document.createElement("button");
  readyButton.textContent = "I'm ready!"

  document.querySelector(".message-container").appendChild(sequenceDiv);
  document.querySelector(".message-container").appendChild(readyButton);

  readyButton.onclick = () =>{
    document.querySelector(".message-container").classList.add("hide");
    userInput();
  }

};

const userInput = () => {
  let answerInput = document.createElement("input");
  answerInput.id = "user-sequence";
  let inputLabel = document.createElement("label");
  inputLabel.textContent = "Enter the sequence:";
  inputLabel.setAttribute("for", "user-sequence");

  const container = document.querySelector(".input-container")
  container.appendChild(inputLabel);
  container.appendChild(answerInput);
}

document.querySelector(".start-button").onclick = () => playGame();
