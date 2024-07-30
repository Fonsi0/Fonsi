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
    },
    {
        text: "You have extra food from a celebration. Do you share it with your neighbors?",
        choices: [
            { text: "Share the food with everyone", valueChange: { kagandahangLoob: 10 } },
            { text: "Keep it for yourself", valueChange: { kagandahangLoob: -5 } }
        ]
    },
    {
        text: "Your colleague at work needs help with a project. It’s outside of your job description but could lead to more opportunities. What do you do?",
        choices: [
            { text: "Help them, expecting nothing in return", valueChange: { pakikisama: 10, kagandahangLoob: 5 } },
            { text: "Help them only if you get something in return", valueChange: { pakikisama: -5, kagandahangLoob: -5 } }
        ]
    },
    {
        text: "Your cousin asks to borrow money. You have the means to lend it but are unsure if they'll pay you back. What do you do?",
        choices: [
            { text: "Lend the money without expecting repayment", valueChange: { utangNaLoob: 10, kagandahangLoob: 5 } },
            { text: "Lend the money but ask for a written agreement", valueChange: { utangNaLoob: -5, kagandahangLoob: -5 } }
        ]
    },
    {
        text: "A close friend is moving away and asks for your help with the moving process. You’re very busy but they’ve helped you before. How do you respond?",
        choices: [
            { text: "Help them as a gesture of gratitude", valueChange: { utangNaLoob: 10, kagandahangLoob: 5 } },
            { text: "Offer to help later but only if it fits your schedule", valueChange: { utangNaLoob: -5, kagandahangLoob: -5 } }
        ]
    },
    {
        text: "You find a lost wallet on the street. It contains a significant amount of money. What do you do?",
        choices: [
            { text: "Return the wallet to its owner without taking anything", valueChange: { kagandahangLoob: 10 } },
            { text: "Keep the money and discard the wallet", valueChange: { kagandahangLoob: -10 } }
        ]
    },
    {
        text: "A neighbor frequently asks for your help with small tasks, but they never return the favor. How do you handle this?",
        choices: [
            { text: "Continue helping them out of kindness", valueChange: { kagandahangLoob: 5 } },
            { text: "Politely set boundaries and explain you need to focus on your own tasks", valueChange: { pakikisama: 5 } }
        ]
    },
    {
        text: "You are invited to a family gathering but have other plans. How do you respond?",
        choices: [
            { text: "Attend the gathering to show respect and build relationships", valueChange: { pakikisama: 10 } },
            { text: "Politely decline and suggest another time to meet", valueChange: { pakikisama: 5 } }
        ]
    },
    {
        text: "You overhear a conversation where someone is criticizing a friend of yours. What do you do?",
        choices: [
            { text: "Speak up and defend your friend", valueChange: { pakikisama: 10, kagandahangLoob: 5 } },
            { text: "Stay silent and avoid getting involved", valueChange: { pakikisama: -5 } }
        ]
    },
    {
        text: "Your family is in need of financial support, and you have some savings. How do you use your resources?",
        choices: [
            { text: "Provide financial support to your family willingly", valueChange: { utangNaLoob: 10, kagandahangLoob: 10 } },
            { text: "Provide support but set clear boundaries on how it should be used", valueChange: { utangNaLoob: 5, kagandahangLoob: 5 } }
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
    
    // Determine player type
    const playerType = determinePlayerType();
    metricsElement.innerHTML += `<p>${playerType}</p>`;
}

function determinePlayerType() {
    let description = 'Based on your choices, here’s what kind of player you are:\n\n';

    if (values.utangNaLoob > 30) {
        description += 'You are a person who values "utang na loob" highly. You are generous and believe in supporting others who have helped you in the past.\n\n';
    } else {
        description += 'You have a balanced approach to "utang na loob". While you appreciate the value of gratitude, you also understand that it’s important to set boundaries.\n\n';
    }

    if (values.pakikisama > 30) {
        description += 'You place a high value on "pakikisama". You strive to maintain good relationships and make efforts to fit in and help others.\n\n';
    } else {
        description += 'You have a practical view of "pakikisama". You value social harmony but also know when to assert your own needs and boundaries.\n\n';
    }

    if (values.kagandahangLoob > 30) {
        description += 'You exhibit a strong sense of "kagandahang loob". You are considerate and always willing to lend a helping hand to others.\n\n';
    } else {
        description += 'You have a moderate sense of "kagandahang loob". You understand the importance of kindness but also balance it with practical considerations.\n\n';
    }

    return description;
}

updateMetrics();
showScenario();
