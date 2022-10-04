let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let resolution = 40;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cols = canvas.width / resolution;
let rows = canvas.height / resolution;


function makeArray(cols, rows) {
    let arr = new Array(cols);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}



function setup() {
    cols = 400 / resolution;
    rows = 400 / resolution;

    grid = makeArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
}

function draw() {

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
        }
    }
}


