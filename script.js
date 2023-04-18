let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let spaces = Array(9).fill(null);

let text = document.getElementById("heading");

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT;

const startGame = () =>
  boxes.forEach((box) => {
    box.addEventListener("click", boxClicked);
  });

// const boxClicked =function(e){}

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    // check player Won
    if (checkWin() !== false) {
      text.innerHTML = `${currentPlayer} has Won! ✨`;
      let winning_blocks = checkWin();
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }
  }
  currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  for (const condition of winningConditions) {
    [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  currentPlayer = X_TEXT;
  text.innerHTML = "TIC TAC TOE";
}

startGame();
