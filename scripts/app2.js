let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let resolution = 20;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cols = (window.innerWidth - (window.innerWidth % resolution)) / resolution;
let rows = (window.innerHeight - (window.innerHeight % resolution)) / resolution;

function buildGrid() {
    return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

let grid = buildGrid();
let timer = setInterval(update, 300);

requestAnimationFrame(setInterval);

function update() {
    grid = nextGeneration(grid);
    render(grid);
    requestAnimationFrame(setInterval);
}

function nextGeneration(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let countNeighbours = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 && yCell >= 0 && xCell < cols && yCell < rows) {
                        const currentNeighbour = grid[xCell][yCell];
                        countNeighbours += currentNeighbour;
                    }
                }
            }
            // rules
            if (cell === 1 && countNeighbours < 2) {
                nextGen[col][row] = 0;
            } else if (cell === 1 && countNeighbours > 3) {
                nextGen[col][row] = 0;
            } else if (cell === 0 && countNeighbours === 3) {
                nextGen[col][row] = 1;
            }
        }
    }
    return nextGen;
}

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'magenta' : 'white';
            // ctx.stroke();
            ctx.fill();
        }
    }
}