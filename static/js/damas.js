(() => {
  const SIZE = 8;
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restartBtn');

  const DIAGONALS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

  let board = [];
  let current = 'vermelho';
  let selected = null;
  let mustContinue = false;
  let gameOver = false;

  function inBounds(r, c) {
    return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
  }

  function isDarkSquare(r, c) {
    return (r + c) % 2 === 1;
  }

  function setupBoard() {
    board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (!isDarkSquare(r, c)) continue;
        if (r <= 2) board[r][c] = { color: 'azul', king: false };
        else if (r >= 5) board[r][c] = { color: 'vermelho', king: false };
      }
    }
  }

  function opponentOf(color) {
    return color === 'vermelho' ? 'azul' : 'vermelho';
  }

  function forwardDir(color) {
    return color === 'vermelho' ? -1 : 1;
  }

  function getSimpleMoves(r, c) {
    const piece = board[r][c];
    const dirs = piece.king ? DIAGONALS : DIAGONALS.filter(([dr]) => dr === forwardDir(piece.color));
    const moves = [];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (inBounds(nr, nc) && !board[nr][nc]) {
        moves.push({ row: nr, col: nc, capture: null });
      }
    }
    return moves;
  }

  function getCaptureMoves(r, c) {
    const piece = board[r][c];
    const moves = [];
    for (const [dr, dc] of DIAGONALS) {
      const mr = r + dr;
      const mc = c + dc;
      const nr = r + dr * 2;
      const nc = c + dc * 2;
      if (!inBounds(nr, nc)) continue;
      const middle = board[mr] && board[mr][mc];
      if (middle && middle.color === opponentOf(piece.color) && !board[nr][nc]) {
        moves.push({ row: nr, col: nc, capture: { row: mr, col: mc } });
      }
    }
    return moves;
  }

  function legalMovesFor(r, c) {
    const captures = getCaptureMoves(r, c);
    if (captures.length) return captures;
    return getSimpleMoves(r, c);
  }

  function anyCaptureAvailable(color) {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] && board[r][c].color === color && getCaptureMoves(r, c).length) {
          return true;
        }
      }
    }
    return false;
  }

  function hasAnyMove(color) {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] && board[r][c].color === color && legalMovesFor(r, c).length) {
          return true;
        }
      }
    }
    return false;
  }

  function countPieces(color) {
    let count = 0;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (board[r][c] && board[r][c].color === color) count++;
      }
    }
    return count;
  }

  function label(color) {
    return color === 'vermelho' ? '🔴 Vermelho' : '🔵 Azul';
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function checkGameEnd() {
    const opponent = opponentOf(current);
    if (countPieces(opponent) === 0 || !hasAnyMove(opponent)) {
      gameOver = true;
      setStatus(`${label(current)} venceu! 🏆`);
      return true;
    }
    return false;
  }

  function render() {
    boardEl.innerHTML = '';
    const legalForSelected = selected ? legalMovesFor(selected.row, selected.col) : [];

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement('div');
        cell.className = `cell ${isDarkSquare(r, c) ? 'cell--dark' : 'cell--light'}`;
        cell.dataset.row = r;
        cell.dataset.col = c;

        if (selected && selected.row === r && selected.col === c) {
          cell.classList.add('is-selected');
        }
        const moveHere = legalForSelected.find((m) => m.row === r && m.col === c);
        if (moveHere) {
          cell.classList.add(moveHere.capture ? 'is-capture' : 'is-move');
        }

        const piece = board[r][c];
        if (piece) {
          const pieceEl = document.createElement('div');
          pieceEl.className = `piece-damas piece-damas--${piece.color}${piece.king ? ' is-dama' : ''}`;
          pieceEl.textContent = piece.king ? '★' : '';
          cell.appendChild(pieceEl);
        }

        cell.addEventListener('click', () => onCellClick(r, c));
        boardEl.appendChild(cell);
      }
    }
  }

  function onCellClick(r, c) {
    if (gameOver) return;
    const piece = board[r][c];

    if (selected) {
      const moves = legalMovesFor(selected.row, selected.col);
      const chosen = moves.find((m) => m.row === r && m.col === c);
      if (chosen) {
        movePiece(selected.row, selected.col, chosen);
        return;
      }
      if (!mustContinue && piece && piece.color === current) {
        selected = { row: r, col: c };
        render();
        return;
      }
      if (!mustContinue) {
        selected = null;
        render();
      }
      return;
    }

    if (piece && piece.color === current) {
      selected = { row: r, col: c };
      render();
    }
  }

  function movePiece(fromRow, fromCol, move) {
    const piece = board[fromRow][fromCol];
    board[fromRow][fromCol] = null;
    board[move.row][move.col] = piece;

    if (move.capture) {
      board[move.capture.row][move.capture.col] = null;
    }

    const promotionRow = piece.color === 'vermelho' ? 0 : SIZE - 1;
    if (move.row === promotionRow) {
      piece.king = true;
    }

    if (move.capture && getCaptureMoves(move.row, move.col).length) {
      selected = { row: move.row, col: move.col };
      mustContinue = true;
      setStatus(`${label(current)}: continua a capturar! 🎯`);
      render();
      return;
    }

    selected = null;
    mustContinue = false;

    if (checkGameEnd()) {
      render();
      return;
    }

    current = opponentOf(current);
    const captureHint = anyCaptureAvailable(current) ? ' (tens uma captura disponível!)' : '';
    setStatus(`Vez do jogador ${label(current)}${captureHint}`);
    render();
  }

  function restart() {
    setupBoard();
    current = 'vermelho';
    selected = null;
    mustContinue = false;
    gameOver = false;
    setStatus(`Vez do jogador ${label(current)}`);
    render();
  }

  restartBtn.addEventListener('click', restart);
  restart();
})();
