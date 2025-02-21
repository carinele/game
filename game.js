const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], // 1st row
    [3, 4, 5], // 2nd row
    [6, 7, 8], // 3rd row
    [0, 3, 6], // 1st column
    [1, 4, 7], // 2nd column
    [2, 5, 8], // 3rd column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // diagonal
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      message.textContent = `Игрок ${gameBoard[a]} выиграл!`;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameOver = true;
    message.textContent = 'Ничья!';
  }
}

function renderBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellDiv);
  });
}

function handleCellClick(index) {
  if (gameBoard[index] || gameOver) return;

  gameBoard[index] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // смена игрока
  renderBoard();
  checkWinner();
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  message.textContent = '';
  renderBoard();
}

resetBtn.addEventListener('click', resetGame);

renderBoard();
