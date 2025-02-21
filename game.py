import random

def guess_the_number():
    number = random.randint(1, 100)  # Компьютер загадывает число
    attempts = 0

    print("Я загадал число от 1 до 100. Попробуй угадать!")

    while True:
        guess = input("Введи число: ")
        attempts += 1

        if not guess.isdigit():
            print("Пожалуйста, введи число!")
            continue
        
        guess = int(guess)

        if guess < number:
            print("Загаданное число больше!")
        elif guess > number:
            print("Загаданное число меньше!")
        else:
            print(f"Поздравляю! Ты угадал число {number} за {attempts} попыток.")
            break

guess_the_number()
