const boardSize = 8;
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
let board = [];
let selectedCell = null;
let score = 0;

// Inicializa o tabuleiro
function initBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board = [];

    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            row.push(color);
            const cell = document.createElement('div');
            cell.classList.add('cell', color);
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
        board.push(row);
    }
}

// Lida com o clique na célula
function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (selectedCell) {
        // Tenta trocar as células
        if (isAdjacent(selectedCell, { row, col })) {
            swapCells(selectedCell, { row, col });
            checkMatches();
        }
        selectedCell = null; // Reseta a célula selecionada
    } else {
        selectedCell = { row, col }; // Seleciona a célula
    }
}

// Verifica se as células são adjacentes
function isAdjacent(cell1, cell2) {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// Troca as células
function swapCells(cell1, cell2) {
    const temp = board[cell1.row][cell1.col];
    board[cell1.row][cell1.col] = board[cell2.row][cell2.col];
    board[cell2.row][cell2.col] = temp;

    updateCellDisplay(cell1);
    updateCellDisplay(cell2);
}

// Atualiza a exibição da célula
function updateCellDisplay(cell) {
    const cellElement = document.querySelector(`.cell[data-row='${cell.row}'][data-col='${cell.col}']`);
    cellElement.className = `cell ${board[cell.row][cell.col]}`;
}

// Verifica combinações e remove
function checkMatches() {
    const matches = [];
    
    // Verifica linhas
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize - 2; j++) {
            if (board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2]) {
                matches.push({ row: i, col: j });
                matches.push({ row: i, col: j + 1 });
                matches.push({ row: i, col: j + 2 });
            }
        }
    }

    // Verifica colunas
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize - 2; i++) {
            if (board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j]) {
                matches.push({ row: i, col: j });
                matches.push({ row: i + 1, col: j });
                matches.push({ row: i + 2, col: j });
            }
        }
    }

    if (matches.length > 0) {
        removeMatches(matches);
    } else {
        // Se não houver combinações, desfaz a troca
        setTimeout(() => {
            swapCells({ row: selectedCell.row, col: selectedCell.col }, { row: selectedCell.row, col: selectedCell.col });
        }, 500);
    }
}

// Remove as combinações e atualiza a pontuação
function removeMatches(matches) {
    const uniqueMatches = [...new Set(matches.map(JSON.stringify))].map(JSON.parse);
    uniqueMatches .forEach(match => {
        board[match.row][match.col] = null; // Remove a célula
        const cellElement = document.querySelector(`.cell[data-row='${match.row}'][data-col='${match.col}']`);
        cellElement.className = 'cell'; // Limpa a célula
    });

    score += uniqueMatches.length; // Atualiza a pontuação
    console.log(`Pontuação: ${score}`);
    dropCells();
}

// Faz as células acima caírem
function dropCells() {
    for (let j = 0; j < boardSize; j++) {
        for (let i = boardSize - 1; i >= 0; i--) {
            if (board[i][j] === null) {
                for (let k = i - 1; k >= 0; k--) {
                    if (board[k][j] !== null) {
                        board[i][j] = board[k][j];
                        board[k][j] = null;
                        updateCellDisplay({ row: i, col: j });
                        updateCellDisplay({ row: k, col: j });
                        break;
                    }
                }
            }
        }
    }
    // Preenche células vazias com novas cores
    fillEmptyCells();
}

// Preenche células vazias com novas cores
function fillEmptyCells() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === null) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                board[i][j] = color;
                const cellElement = document.querySelector(`.cell[data-row='${i}'][data-col='${j}']`);
                cellElement.className = `cell ${color}`;
            }
        }
    }
}

// Inicia o jogo
initBoard();