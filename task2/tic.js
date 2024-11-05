let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let coins = 200;
let gameActive = false;

function startGame() {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;
  
  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }
  
  if (coins < 10) {
    alert("Insufficient coins! Need at least 10 coins to play.");
    return;
  }
  
  coins -= 10;
  document.getElementById("coins").textContent = coins;
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  document.getElementById("status").textContent = `${player1}'s turn (X)`;
  document.getElementById("result").textContent = ""; // Clear previous result
  renderBoard();
}

function renderBoard() {
  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.textContent = board[index];
    cell.style.pointerEvents = gameActive && board[index] === "" ? "auto" : "none";
  });
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWin()) {
    let winner = currentPlayer === "X" ? player1 : player2;
    let loser = currentPlayer === "X" ? player2 : player1;
    document.getElementById("status").textContent = `${winner} wins!`;
    document.getElementById("result").textContent = `${winner} won, ${loser} lost!`;
    coins += 100;
    document.getElementById("coins").textContent = coins;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a draw!";
    document.getElementById("result").textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    let currentPlayerName = currentPlayer === "X" ? player1 : player2;
    document.getElementById("status").textContent = `${currentPlayerName}'s turn (${currentPlayer})`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = false;
  document.getElementById("status").textContent = "Enter player details to start the game";
  document.getElementById("result").textContent = ""; // Clear result message

  // Clear player inputs and reset focus
  document.getElementById("player1").value = "";
  document.getElementById("player2").value = "";

  renderBoard();
}
