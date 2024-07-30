let village = {
    trees: 0,
    houses: 0,
    neighborsHelped: 0
};

function completeTask(task) {
    switch(task) {
        case 'plantTree':
            village.trees++;
            break;
        case 'buildHouse':
            village.houses++;
            break;
        case 'helpNeighbor':
            village.neighborsHelped++;
            break;
    }
    updateProgress();
}

function updateProgress() {
    let progressText = `Trees Planted: ${village.trees}, Houses Built: ${village.houses}, Neighbors Helped: ${village.neighborsHelped}`;
    document.getElementById('progressText').innerText = progressText;

    // Update village visualization
    let villageDiv = document.getElementById('village');
    villageDiv.innerHTML = `
        <div>🌳 Trees: ${village.trees}</div>
        <div>🏠 Houses: ${village.houses}</div>
        <div>🤝 Helped: ${village.neighborsHelped}</div>
    `;
}
