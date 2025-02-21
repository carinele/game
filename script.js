// Настройки канваса
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размер канваса
canvas.width = 800;
canvas.height = 600;

// Персонаж
const player = {
    x: 50,
    y: 50,
    width: 40,
    height: 40,
    color: '#e74c3c',  // Красный цвет для игрока
    speed: 5,
    border: 4,  // Тень для улучшения внешнего вида
    shadowColor: 'rgba(0, 0, 0, 0.6)' // Цвет тени
};

// Лабиринт
const maze = [
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2] // 2 - выход
];

// Размер клетки
const cellSize = 100;

// Функция рисования лабиринта
function drawMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            const cell = maze[row][col];
            const x = col * cellSize;
            const y = row * cellSize;

            if (cell === 1) {
                ctx.fillStyle = '#34495e'; // Стены - темно-серый
            } else if (cell === 2) {
                ctx.fillStyle = '#2ecc71'; // Выход - зеленый
            } else {
                ctx.fillStyle = '#ecf0f1'; // Пустое пространство - светло-серый
            }
            ctx.fillRect(x, y, cellSize, cellSize);
            ctx.strokeStyle = '#2980b9'; // Рамка лабиринта
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, cellSize, cellSize);
        }
    }
}

// Функция рисования игрока с тенью
function drawPlayer() {
    // Тень игрока
    ctx.shadowColor = player.shadowColor;
    ctx.shadowBlur = 15;

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Убираем тень
    ctx.shadowColor = 'transparent';
}

// Проверка на столкновение с стеной
function isColliding(x, y) {
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    if (maze[row] && maze[row][col] === 1) {
        return true; // Столкновение с стеной
    }
    return false;
}

// Проверка на достижение выхода
function isExit(x, y) {
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    return maze[row] && maze[row][col] === 2; // Выход
}

// Обработчик движения игрока
function movePlayer() {
    document.addEventListener('keydown', (event) => {
        let newX = player.x;
        let newY = player.y;

        if (event.key === 'ArrowUp') {
            newY -= player.speed;
        } else if (event.key === 'ArrowDown') {
            newY += player.speed;
        } else if (event.key === 'ArrowLeft') {
            newX -= player.speed;
        } else if (event.key === 'ArrowRight') {
            newX += player.speed;
        }

        // Проверка на столкновение с лабиринтом
        if (!isColliding(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }

        // Проверка на достижение выхода
        if (isExit(player.x, player.y)) {
            displayGameOver();
        }
    });
}

// Показать сообщение о завершении игры
function displayGameOver() {
    const gameOverElement = document.getElementById('gameOver');
    gameOverElement.style.display = 'block';
    setTimeout(() => {
        gameOverElement.style.display = 'none';
        resetGame();
    }, 2000);
}

// Функция для сброса игры
function resetGame() {
    player.x = 50;
    player.y = 50;
}

// Главная игровая функция
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка экрана
    drawMaze(); // Рисуем лабиринт
    drawPlayer(); // Рисуем игрока
    requestAnimationFrame(gameLoop); // Рекурсивный вызов
}

// Инициализация игры
movePlayer();
gameLoop();
