(() => {
  const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const boardEl = document.getElementById('board');
  const cells = Array.from(boardEl.querySelectorAll('.cell-galo'));
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restartBtn');
  const modePvpBtn = document.getElementById('modePvp');
  const modeCpuBtn = document.getElementById('modeCpu');

  let board = Array(9).fill('');
  let current = 'X';
  let gameOver = false;
  let vsComputer = false;

  function symbol(value) {
    return value === 'X' ? 'X' : value === 'O' ? 'O' : '';
  }

  function render() {
    cells.forEach((cell, i) => {
      cell.textContent = symbol(board[i]);
      cell.classList.toggle('is-x', board[i] === 'X');
      cell.classList.toggle('is-o', board[i] === 'O');
      cell.disabled = Boolean(board[i]) || gameOver;
    });
  }

  function findWinner() {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }
    return null;
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function endIfDone() {
    const result = findWinner();
    if (result) {
      gameOver = true;
      result.line.forEach((i) => cells[i].classList.add('is-win'));
      setStatus(`${symbol(result.winner)} venceu! 🎉`);
      render();
      return true;
    }
    if (board.every(Boolean)) {
      gameOver = true;
      setStatus('Empate! 🤝');
      render();
      return true;
    }
    return false;
  }

  function statusForTurn() {
    if (vsComputer && current === 'O') {
      setStatus('🤖 O computador está a pensar...');
    } else {
      setStatus(`Vez do jogador ${symbol(current)}`);
    }
  }

  function play(index) {
    if (gameOver || board[index]) return;
    board[index] = current;
    render();
    if (endIfDone()) return;
    current = current === 'X' ? 'O' : 'X';
    statusForTurn();
    if (vsComputer && current === 'O' && !gameOver) {
      setTimeout(computerMove, 450);
    }
  }

  function availableMoves() {
    return board.reduce((acc, v, i) => { if (!v) acc.push(i); return acc; }, []);
  }

  function tryFindWinningMove(forSymbol) {
    for (const move of availableMoves()) {
      const copy = board.slice();
      copy[move] = forSymbol;
      for (const line of WIN_LINES) {
        const [a, b, c] = line;
        if (copy[a] === forSymbol && copy[b] === forSymbol && copy[c] === forSymbol) {
          return move;
        }
      }
    }
    return null;
  }

  function computerMove() {
    if (gameOver) return;
    let move = tryFindWinningMove('O');
    if (move === null) move = tryFindWinningMove('X');
    if (move === null && !board[4]) move = 4;
    if (move === null) {
      const corners = [0, 2, 6, 8].filter((i) => !board[i]);
      if (corners.length) move = corners[Math.floor(Math.random() * corners.length)];
    }
    if (move === null) {
      const free = availableMoves();
      move = free[Math.floor(Math.random() * free.length)];
    }
    play(move);
  }

  function restart() {
    board = Array(9).fill('');
    current = 'X';
    gameOver = false;
    cells.forEach((cell) => cell.classList.remove('is-win'));
    render();
    statusForTurn();
  }

  cells.forEach((cell) => {
    cell.addEventListener('click', () => play(Number(cell.dataset.index)));
  });

  restartBtn.addEventListener('click', restart);
  modePvpBtn.addEventListener('click', () => { vsComputer = false; modePvpBtn.classList.add('is-active'); modeCpuBtn.classList.remove('is-active'); restart(); });
  modeCpuBtn.addEventListener('click', () => { vsComputer = true; modeCpuBtn.classList.add('is-active'); modePvpBtn.classList.remove('is-active'); restart(); });

  modePvpBtn.classList.add('is-active');
  restart();
})();
