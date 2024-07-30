const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const character = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    size: 50,
    speed: 5,
    emoji: '👨🏽', // Brown-skinned full-body man emoji
};

const trees = [];
const houses = [];
const npcs = [];
const points = {
    current: 0,
    goal: 100
};

let canPlant = true;
let lastActionTime = 0;

function drawControls() {
    ctx.font = '18px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Controls:', 10, 10);
    ctx.fillText('W: Move Up', 10, 30);
    ctx.fillText('A: Move Left', 10, 50);
    ctx.fillText('S: Move Down', 10, 70);
    ctx.fillText('D: Move Right', 10, 90);
    ctx.fillText('Q: Plant Tree', 10, 110);
    ctx.fillText('E: Interact', 10, 130);
    ctx.fillText('R: Spawn House', 10, 150);
}

function drawStats() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Points: ${points.current}`, 10, 200);
    ctx.fillText(`Goal: ${points.goal}`, 10, 230);
}

function drawCharacter() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas

    // Draw trees
    trees.forEach(tree => {
        ctx.font = '50px Arial';
        ctx.fillText('🌳', tree.x, tree.y);
    });

    // Draw houses
    houses.forEach(house => {
        ctx.font = '50px Arial';
        ctx.fillText('🏠', house.x, house.y);
    });

    // Draw NPCs
    npcs.forEach(npc => {
        ctx.font = '50px Arial';
        ctx.fillText('👥', npc.x, npc.y);
    });

    // Draw character
    ctx.font = `${character.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.emoji, character.x, character.y);

    // Draw stats
    drawStats();

    // Draw controls
    drawControls();
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

function handleInteraction() {
    npcs.forEach((npc, index) => {
        const dx = character.x - npc.x;
        const dy = character.y - npc.y;
        if (Math.sqrt(dx * dx + dy * dy) < character.size) {
            if (keyState['e']) {
                points.current += 20;
                npcs.splice(index, 1); // Remove the interacted NPC
            }
        }
    });

    trees.forEach((tree, index) => {
        const dx = character.x - tree.x;
        const dy = character.y - tree.y;
        if (Math.sqrt(dx * dx + dy * dy) < character.size) {
            if (keyState['e']) {
                points.current += 20;
                trees.splice(index, 1); // Remove the interacted tree
            }
        }
    });

    houses.forEach((house, index) => {
        const dx = character.x - house.x;
        const dy = character.y - house.y;
        if (Math.sqrt(dx * dx + dy * dy) < character.size) {
            if (keyState['e']) {
                points.current += 15;
                houses.splice(index, 1); // Remove the interacted house
            }
        }
    });
}

function handleActions() {
    const currentTime = Date.now();

    if (keyState['q'] && canPlant && (currentTime - lastActionTime > 5000)) {
        if (trees.length < 5) {
            trees.push({ x: Math.random() * canvasWidth, y: Math.random() * canvasHeight });
            points.current += 50;
            lastActionTime = currentTime;
        }
    }

    if (keyState['r'] && canPlant && (currentTime - lastActionTime > 5000)) {
        if (houses.length < 5) {
            houses.push({ x: Math.random() * canvasWidth, y: Math.random() * canvasHeight });
            points.current += 15;
            lastActionTime = currentTime;
        }
    }
}

const keyState = {};

document.addEventListener('keydown', (event) => {
    keyState[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
    keyState[event.key.toLowerCase()] = false;
});

function gameLoop() {
    updateCharacterPosition();
    handleActions();
    handleInteraction();
    drawCharacter();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
