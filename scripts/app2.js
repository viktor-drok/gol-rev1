let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let resolution = 20; // px

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cols = (window.innerWidth - (window.innerWidth % resolution)) / resolution;
let rows = (window.innerHeight - (window.innerHeight % resolution)) / resolution;

function buildGrid() {
    return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(() => Math.round(Math.random()))
        );
}

let mouseOffsetX;
let mouseOffsetY;


let grid = buildGrid();
let nextGenerationGrid = nextGeneration(grid);
// let timer = setInterval(update, 1000);

// requestAnimationFrame(setInterval);
render(grid);

function update() {
    grid = nextGenerationGrid;
    render(grid);
    // requestAnimationFrame(setInterval);
}

function nextGeneration(getCellGrid) {
    const nextGen = getCellGrid.map(arr => [...arr]);

    for (let col = 0; col < getCellGrid.length; col++) {
        for (let row = 0; row < getCellGrid[col].length; row++) {
            const cell = getCellGrid[col][row];
            // console.log(cell);
            let countNeighbours = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 && yCell >= 0 && xCell < cols && yCell < rows) {
                        const currentNeighbour = getCellGrid[xCell][yCell];
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
    // console.log(nextGen);
    return nextGen;
}


function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'lightblue' : '#333';
            // ctx.stroke();
            ctx.fill();
        }
    }
}

// function handleClick() {
//     const newGrid = grid.map(arr => [...arr]);

//     ctx.fillStyle = "lightblue";
//     ctx.fillRect(x_clickedCell,
//         y_clickedCell,
//         resolution, resolution);
// }

// canvas.addEventListener('click', handleClick);
window.addEventListener('click', getMouseOffset);

// document.querySelector('#canvas').onmousemove = handleClick;

// let mouseOffsetX;
// let mouseOffsetY;
let clickedCell;
let x_clickedCell;
let y_clickedCell;
let getCellGrid;

function getMouseOffset(e) {

    mouseOffsetX = e.offsetX;
    mouseOffsetY = e.offsetY;
    getCellGrid = getCell(grid);
    // console.log(mouseOffsetX, mouseOffsetY);
}


function getCell(grid) {
    let newGrid = grid.map(arr => [...arr]);

    for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[i].length; j++) {
            const clickedCell = newGrid[i][j];
            i = (mouseOffsetX - (mouseOffsetX % resolution)) / resolution;
            j = (mouseOffsetY - (mouseOffsetY % resolution)) / resolution;
            console.log(clickedCell);
        }
    }
    return newGrid;
}

// function calcNextCellState(neighbourhood) {
//     neighbourhood = neighbourhood.flat();

//     const [cellState] = neighbourhood.splice(4, 1);
//     const neighbourCount = neighbourhood.filter(Boolean).length;

//     return cellState
//         ? +(neighbourCount === 2 || neighbourCount === 3)
//         : +(neighbourCount === 3);
// }

// function runSimulation() {
//     timerId = setInterval(() => {
//         proceed();
//         render();
//     }, 1000 / stepsPerSecond);
// }