let rows, cols, minesCount;
let board = [];
let gameOver = false;
let flagsLeft = 0;

let timerInterval;
let timeElapsed = 0;

const boardDiv = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');
const minesCounter = document.getElementById('minesCounter');
const difficultySelect = document.getElementById('difficulty');
const timerDisplay = document.getElementById('timer');
const recordDisplay = document.getElementById('record');

resetBtn.addEventListener('click', initGame);

// Mostrar récord guardado
updateRecordDisplay();

function initGame() {
  clearInterval(timerInterval);
  timeElapsed = 0;
  timerDisplay.textContent = timeElapsed;

  const difficulty = difficultySelect.value;
  switch(difficulty) {
    case 'easy':
      rows = 8; cols = 8; minesCount = 10; break;
    case 'medium':
      rows = 16; cols = 16; minesCount = 40; break;
    case 'hard':
      rows = 16; cols = 30; minesCount = 99; break;
  }

  gameOver = false;
  flagsLeft = minesCount;
  minesCounter.textContent = flagsLeft;
  board = [];
  boardDiv.innerHTML = '';
  boardDiv.style.gridTemplateRows = `repeat(${rows}, 35px)`;
  boardDiv.style.gridTemplateColumns = `repeat(${cols}, 35px)`;

  // Crear tablero vacío
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = { mine: false, revealed: false, neighbors: 0, flagged: false };
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.row = r;
      cellDiv.dataset.col = c;

      // Iniciar cronómetro al primer clic
      cellDiv.addEventListener('click', startTimerOnce);

      cellDiv.addEventListener('click', () => revealCell(r, c));
      cellDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        toggleFlag(r, c);
      });

      boardDiv.appendChild(cellDiv);
    }
  }

  // Colocar minas
  let minesPlaced = 0;
  while (minesPlaced < minesCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      minesPlaced++;
    }
  }

  // Calcular vecinos
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].mine) {
        board[r][c].neighbors = countNeighbors(r, c);
      }
    }
  }
}

// Contar minas alrededor
function countNeighbors(r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) {
        count++;
      }
    }
  }
  return count;
}

// Revelar celda
function revealCell(r, c) {
  const cell = board[r][c];
  if (gameOver || cell.revealed || cell.flagged) return;

  cell.revealed = true;
  const cellDiv = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
  cellDiv.classList.add('revealed');

  if (cell.mine) {
    cellDiv.classList.add('mine');
    alert('¡Perdiste!');
    gameOver = true;
    revealAllMines();
    stopTimer();
    return;
  }

  if (cell.neighbors > 0) {
    cellDiv.textContent = cell.neighbors;
  } else {
    // Revelar celdas adyacentes automáticamente si no hay minas alrededor
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          revealCell(nr, nc);
        }
      }
    }
  }

  checkWin();
}

// Colocar o quitar bandera
function toggleFlag(r, c) {
  const cell = board[r][c];
  if (gameOver || cell.revealed) return;

  if (!cell.flagged && flagsLeft === 0) return;

  cell.flagged = !cell.flagged;
  const cellDiv = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
  if (cell.flagged) {
    cellDiv.classList.add('flag');
    cellDiv.textContent = '🚩';
    flagsLeft--;
  } else {
    cellDiv.classList.remove('flag');
    cellDiv.textContent = '';
    flagsLeft++;
  }
  minesCounter.textContent = flagsLeft;
}

// Revelar todas las minas
function revealAllMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) {
        const cellDiv = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
        cellDiv.classList.add('revealed', 'mine');
      }
    }
  }
}

// Comprobar si se ganó
function checkWin() {
  let won = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = board[r][c];
      if (!cell.mine && !cell.revealed) {
        won = false;
      }
    }
  }
  if (won) {
    stopTimer();
    alert(`¡Ganaste! 🎉 Tiempo: ${timeElapsed} s`);
    saveRecord(timeElapsed);
    gameOver = true;
  }
}

// Cronómetro
function startTimerOnce() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeElapsed++;
      timerDisplay.textContent = timeElapsed;
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Guardar récord usando localStorage
function saveRecord(time) {
  const difficulty = difficultySelect.value;
  const key = `minesweeperRecord_${difficulty}`;
  const currentRecord = localStorage.getItem(key);
  if (!currentRecord || time < currentRecord) {
    localStorage.setItem(key, time);
    updateRecordDisplay();
  }
}

function updateRecordDisplay() {
  const difficulty = difficultySelect.value;
  const key = `minesweeperRecord_${difficulty}`;
  const record = localStorage.getItem(key);
  recordDisplay.textContent = record ? record : '--';
}

// Actualizar récord al cambiar dificultad
difficultySelect.addEventListener('change', updateRecordDisplay);

// ------------------------------------------------
// Función de ayuda: revelar algunas celdas seguras
boardDiv.addEventListener('click', revealSomeCells);

function revealSomeCells(e) {
  if (gameOver) return;

  // Elegir 3-5 celdas al azar que no estén reveladas ni sean minas
  let unrevealedSafeCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].revealed && !board[r][c].mine) {
        unrevealedSafeCells.push({r, c});
      }
    }
  }

  if (unrevealedSafeCells.length === 0) return;

  const count = Math.min(5, unrevealedSafeCells.length); // revelar máximo 5
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * unrevealedSafeCells.length);
    const cell = unrevealedSafeCells.splice(index, 1)[0];
    revealCell(cell.r, cell.c);
  }
}
