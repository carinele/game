let secretNumber = Math.floor(Math.random() * 11); // Генерируем случайное число от 0 до 10
let attempts = 0;

const checkButton = document.getElementById('checkButton');
const resultText = document.getElementById('result');
const attemptsText = document.getElementById('attempts');

checkButton.addEventListener('click', function() {
  const userGuess = parseInt(document.getElementById('guess').value);
  
  if (isNaN(userGuess) || userGuess < 0 || userGuess > 10) {
    resultText.textContent = 'Пожалуйста, введите число от 0 до 10!';
    resultText.style.color = 'red';
    return;
  }

  attempts++;
  attemptsText.textContent = `Попытки: ${attempts}`;

  if (userGuess === secretNumber) {
    resultText.textContent = 'Поздравляю, ты угадал!';
    resultText.style.color = 'green';
    secretNumber = Math.floor(Math.random() * 11); // Генерируем новое число после победы
  } else if (userGuess > secretNumber) {
    resultText.textContent = 'Слишком большое число. Попробуй снова!';
    resultText.style.color = 'orange';
  } else {
    resultText.textContent = 'Слишком маленькое число. Попробуй снова!';
    resultText.style.color = 'orange';
  }
});
