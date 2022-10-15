const rows = 60;
const cols = 60;

function createGameGrid() {
    let canvas = document.querySelector('#canvas');
    let tbl = document.createElement('table');

    tbl.setAttribute('id', 'gameGrid');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');

            cell.addEventListener('click', () => {
                cell.classList.toggle('alive');
            });

            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    canvas.appendChild(tbl);
}

onload = () => {
    createGameGrid();
};
