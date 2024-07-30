const character = document.getElementById('character');
const pointsDisplay = document.getElementById('points-display');
const goalDisplay = document.getElementById('goal');
const gameArea = document.getElementById('game-area');

let points = 0;
const goal = 100;
const moveSpeed = 10; // Movement speed in pixels

// Initialize character position
let charX = 0;
let charY = 0;

// Update character position
function updateCharacterPosition() {
    character.style.left = `${charX}px`;
    character.style.top = `${charY}px`;
}

// Handle keyboard controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (charY > 0) charY -= moveSpeed;
            break;
        case 'ArrowDown':
            if (charY < gameArea.clientHeight - character.clientHeight) charY += moveSpeed;
            break;
        case 'ArrowLeft':
            if (charX > 0) charX -= moveSpeed;
            break;
        case 'ArrowRight':
            if (charX < gameArea.clientWidth - character.clientWidth) charX += moveSpeed;
            break;
    }
    updateCharacterPosition();
    checkGoal();
});

// Check if the player has reached the goal
function checkGoal() {
    // Placeholder for collision detection with items
    // Here, you can add collision logic to detect when the character interacts with items to gain points

    // For example, we increment points when the character reaches a specific position (just for demonstration)
    if (charX > gameArea.clientWidth / 2) {
        points += 10;
        pointsDisplay.innerText = `Points: ${points}`;
        if (points >= goal) {
            goalDisplay.innerText = 'You Win!';
        }
    }
}

// Initialize the game
updateCharacterPosition();
