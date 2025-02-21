// game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const gameOverMessage = document.getElementById("gameOver");
const restartButton = document.getElementById("restartButton");

let player = { x: 50, y: 50, size: 20, color: "green" };
let exit = { x: 380, y: 380, size: 20, color: "red" };
let maze = [];
let gameStarted = false;

const mazeWidth = 10;
const mazeHeight = 10;
const blockSize = 40;

// Функция для генерации лабиринта
function generateMaze() {
    maze = [];
    for (let y = 0; y < mazeHeight; y++) {
        maze[y] = [];
        for (let x = 0; x < mazeWidth; x++) {
            maze[y][x] = Math.random() < 0.3 ? 1 : 0; // 0 - пустое место, 1 - стена
        }
    }
    maze[0][0] = 0; // Начало
    maze[mazeHeight - 1][mazeWidth - 1] = 0; // Выход
}

// Функция для рисования лабиринта
function drawMaze() {
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = "#2ecc71"; // Стены в виде кустов
            } else {
                ctx.fillStyle = "#ecf0f1"; // Пустые пространства
            }
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        }
    }
}

// Функция для рисования игрока
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Функция для рисования выхода
function drawExit() {
    ctx.fillStyle = exit.color;
    ctx.fillRect(exit.x, exit.y, exit.size, exit.size);
}

// Функция для проверки нахождения выхода
function checkExit() {
    if (player.x === exit.x && player.y === exit.y) {
        gameOverMessage.style.display = "block";
        restartButton.style.display = "block";
        gameStarted = false;
    }
}

// Функция для обработки движения игрока
function movePlayer(e) {
    if (!gameStarted) return;

    if (e.key === "ArrowUp" && player.y > 0 && maze[Math.floor((player.y - blockSize) / blockSize)][Math.floor(player.x / blockSize)] === 0) {
        player.y -= blockSize;
    }
    if (e.key === "ArrowDown" && player.y < canvas.height - player.size && maze[Math.floor((player.y + blockSize) / blockSize)][Math.floor(player.x / blockSize)] === 0) {
        player.y += blockSize;
    }
    if (e.key === "ArrowLeft" && player.x > 0 && maze[Math.floor(player.y / blockSize)][Math.floor((player.x - blockSize) / blockSize)] === 0) {
        player.x -= blockSize;
    }
    if (e.key === "ArrowRight" && player.x < canvas.width - player.size && maze[Math.floor(player.y / blockSize)][Math.floor((player.x + blockSize) / blockSize)] === 0) {
        player.x += blockSize;
    }
    checkExit();
    draw();
}

// Функция для рисования всех элементов
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPlayer();
    drawExit();
}

// Функция для старта игры
function startGame() {
    gameStarted = true;
    startButton.style.display = "none";
    canvas.style.display = "block";
    gameOverMessage.style.display = "none";
    restartButton.style.display = "none";
    player = { x: 50, y: 50, size: 20, color: "green" };
    generateMaze();
    draw();
}

// Функция для рестарта игры
function restartGame() {
    gameOverMessage.style.display = "none";
    restartButton.style.display = "none";
    player = { x: 50, y: 50, size: 20, color: "green" };
    generateMaze();
    draw();
}

// Обработчики событий
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
document.addEventListener("keydown", movePlayer);
