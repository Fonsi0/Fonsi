const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const metricsElement = document.getElementById('metrics');

let values = {
    utangNaLoob: 0,
    pakikisama: 0,
    kagandahangLoob: 0
};

const scenarios = [
    {
        text: "You are in a village where everyone helps each other. A friend asks for a favor, but it’s inconvenient for you. What do you do?",
        choices: [
            { text: "Help them despite the inconvenience", valueChange: { kagandahangLoob: 10 } },
            { text: "Politely refuse and explain your situation", valueChange: { pakikisama: -5 } }
        ]
    },
    {
        text: "You have a chance to help an elderly neighbor, but it requires some effort. How do you handle it?",
        choices: [
            { text: "Help them and expect nothing in return", valueChange: { utangNaLoob: 10, kagandahangLoob: 5 } },
            { text: "Help them if they offer you something in return", valueChange: { utangNaLoob: -5, kagandahangLoob: -5 } }
        ]
    },
    {
        text: "A fellow villager has been gossiping about you. How do you react?",
        choices: [
            { text: "Confront them and clear the misunderstanding", valueChange: { pakikisama: 5 } },
            { text: "Ignore them and avoid further conflict", valueChange: { pakikisama: -5 } }
        ]
    }
];

let currentScenario = 0;

function updateMetrics() {
    metricsElement.innerHTML = `
        <p>Utang na Loob: ${values.utangNaLoob}</p>
        <p>Pakikisama: ${values.pakikisama}</p>
        <p>Kagandahang Loob: ${values.kagandahangLoob}</p>
    `;
}

function showScenario() {
    const scenario = scenarios[currentScenario];
    storyElement.textContent = scenario.text;
    choicesElement.innerHTML = '';

    scenario.choices.forEach((choice, index) => {
        const button = document.createElement('div');
        button.textContent = choice.text;
        button.className = 'choice-button';
        button.onclick = () => {
            Object.keys(choice.valueChange).forEach(key => {
                values[key] += choice.valueChange[key];
            });

            updateMetrics();
            currentScenario++;
            if (currentScenario < scenarios.length) {
                showScenario();
            } else {
                endGame();
            }
        };
        choicesElement.appendChild(button);
    });
}

function endGame() {
    storyElement.textContent = "The story has ended. Thank you for playing!";
    choicesElement.innerHTML = '';
}

updateMetrics();
showScenario();
