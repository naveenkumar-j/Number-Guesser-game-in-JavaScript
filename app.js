/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'btn-successplay-again btn-success') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        errorMessage(`Please enter a number between ${min} and ${max}`);
    } else {
        // Check if won
        if (guess === winningNum) {
            // Game over won
            // // Disable Input
            // guessInput.disabled = true;
            // // Change border color
            // guessInput.style.borderColor = 'green';
            // setMessage(`${winningNum} is correct! YOU WIN!`, 'green')
            gameOVer(true, `${winningNum} is correct! YOU WON!`);
        } else {
            // Wrong number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game over lost
                gameOVer(false, `Game Over, you lost. The correct number was ${winningNum}`);

            }
            else {
                // Game continues - answer wrong

                // Change border color
                guessInput.style.borderColor = 'red';

                // Clear Input
                guessInput.value = '';

                // Tell user its the wrong number
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            }

        }
    }
});

// game over
function gameOVer(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again btn-success';
}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function errorMessage(msg) {
    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';
    // Create a text node append to div
    errorDiv.appendChild(document.createTextNode(msg));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Disable button
    guessBtn.disabled=true;

    // clear error after 2 seconds
    setTimeout(clearError, 2000);

}

// Clear error
function clearError() {
    // Enable button after 2 seconds
    guessBtn.disabled=false;

    // Remove alert message after 2 seconds
    document.querySelector('.alert').remove();
}


