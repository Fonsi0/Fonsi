const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 800;
const canvasHeight = 600;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const character = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    size: 50, // Adjust size as needed
    speed: 5,
    emoji: '👨', // Emoji used as the character
};

function drawCharacter() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas
    ctx.font = `${character.size}px Arial`; // Set font size and type
    ctx.textAlign = 'center'; // Center text horizontally
    ctx.textBaseline = 'middle'; // Center text vertically
    ctx.fillText(character.emoji, character.x, character.y); // Draw the emoji
}

function updateCharacterPosition() {
    if (keyState['w']) {
        character.y -= character.speed;
    }
    if (keyState['s']) {
        character.y += character.speed;
    }
    if (keyState['a']) {
        character.x -= character.speed;
    }
    if (keyState['d']) {
        character.x += character.speed;
    }
    drawCharacter();
}

// Handle key states
const keyState = {};

document.addEventListener('keydown', (event) => {
    keyState[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
    keyState[event.key.toLowerCase()] = false;
});

function gameLoop() {
    updateCharacterPosition();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
