(() => {
  const SIZE = 8;
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restartBtn');

  const GLYPHS = {
    vermelho: { pawn: '♙', knight: '♘', bishop: '♗', rook: '♖', queen: '♕', king: '♔' },
    azul: { pawn: '♟', knight: '♞', bishop: '♝', rook: '♜', queen: '♛', king: '♚' },
  };

  const ROOK_DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const BISHOP_DIRS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  const QUEEN_DIRS = [...ROOK_DIRS, ...BISHOP_DIRS];
  const KNIGHT_DELTAS = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

  let board = [];
  let current = 'vermelho';
  let selected = null;
  let gameOver = false;

  function inBounds(r, c) {
    return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
  }

  function opponentOf(color) {
    return color === 'vermelho' ? 'azul' : 'vermelho';
  }

  function label(color) {
    return color === 'vermelho' ? '🔴 Vermelho' : '🔵 Azul';
  }

  function piece(color, type) {
    return { color, type, moved: false };
  }

  function setupBoard() {
    board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    const backRank = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

    for (let c = 0; c < SIZE; c++) {
      board[0][c] = piece('azul', backRank[c]);
      board[1][c] = piece('azul', 'pawn');
      board[6][c] = piece('vermelho', 'pawn');
      board[7][c] = piece('vermelho', backRank[c]);
    }
  }

  function slideMoves(r, c, directions) {
    const moves = [];
    const self = board[r][c];
    for (const [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;
      while (inBounds(nr, nc)) {
        const target = board[nr][nc];
        if (!target) {
          moves.push({ row: nr, col: nc });
        } else {
          if (target.color !== self.color) moves.push({ row: nr, col: nc });
          break;
        }
        nr += dr;
        nc += dc;
      }
    }
    return moves;
  }

  function stepMoves(r, c, deltas) {
    const moves = [];
    const self = board[r][c];
    for (const [dr, dc] of deltas) {
      const nr = r + dr;
      const nc = c + dc;
      if (!inBounds(nr, nc)) continue;
      const target = board[nr][nc];
      if (!target || target.color !== self.color) moves.push({ row: nr, col: nc });
    }
    return moves;
  }

  function pawnMoves(r, c) {
    const self = board[r][c];
    const dir = self.color === 'vermelho' ? -1 : 1;
    const moves = [];

    const oneRow = r + dir;
    if (inBounds(oneRow, c) && !board[oneRow][c]) {
      moves.push({ row: oneRow, col: c });
      const twoRow = r + dir * 2;
      if (!self.moved && inBounds(twoRow, c) && !board[twoRow][c]) {
        moves.push({ row: twoRow, col: c });
      }
    }

    for (const dc of [-1, 1]) {
      const nr = r + dir;
      const nc = c + dc;
      if (inBounds(nr, nc) && board[nr][nc] && board[nr][nc].color !== self.color) {
        moves.push({ row: nr, col: nc });
      }
    }
    return moves;
  }

  function legalMovesFor(r, c) {
    const self = board[r][c];
    if (!self) return [];
    switch (self.type) {
      case 'pawn': return pawnMoves(r, c);
      case 'rook': return slideMoves(r, c, ROOK_DIRS);
      case 'bishop': return slideMoves(r, c, BISHOP_DIRS);
      case 'queen': return slideMoves(r, c, QUEEN_DIRS);
      case 'knight': return stepMoves(r, c, KNIGHT_DELTAS);
      case 'king': return stepMoves(r, c, QUEEN_DIRS);
      default: return [];
    }
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function render() {
    boardEl.innerHTML = '';
    const legalForSelected = selected ? legalMovesFor(selected.row, selected.col) : [];

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement('div');
        cell.className = `cell ${(r + c) % 2 === 1 ? 'cell--dark' : 'cell--light'}`;
        cell.dataset.row = r;
        cell.dataset.col = c;

        if (selected && selected.row === r && selected.col === c) {
          cell.classList.add('is-selected');
        }
        const moveHere = legalForSelected.find((m) => m.row === r && m.col === c);
        if (moveHere) {
          cell.classList.add(board[r][c] ? 'is-capture' : 'is-move');
        }

        const cellPiece = board[r][c];
        if (cellPiece) {
          const span = document.createElement('span');
          span.className = `piece-xadrez piece-xadrez--${cellPiece.color}`;
          span.textContent = GLYPHS[cellPiece.color][cellPiece.type];
          cell.appendChild(span);
        }

        cell.addEventListener('click', () => onCellClick(r, c));
        boardEl.appendChild(cell);
      }
    }
  }

  function onCellClick(r, c) {
    if (gameOver) return;
    const target = board[r][c];

    if (selected) {
      const moves = legalMovesFor(selected.row, selected.col);
      const chosen = moves.find((m) => m.row === r && m.col === c);
      if (chosen) {
        movePiece(selected.row, selected.col, chosen);
        return;
      }
      if (target && target.color === current) {
        selected = { row: r, col: c };
        render();
        return;
      }
      selected = null;
      render();
      return;
    }

    if (target && target.color === current) {
      selected = { row: r, col: c };
      render();
    }
  }

  function movePiece(fromRow, fromCol, move) {
    const movingPiece = board[fromRow][fromCol];
    const captured = board[move.row][move.col];

    board[fromRow][fromCol] = null;
    board[move.row][move.col] = movingPiece;
    movingPiece.moved = true;

    const lastRank = movingPiece.color === 'vermelho' ? 0 : SIZE - 1;
    if (movingPiece.type === 'pawn' && move.row === lastRank) {
      movingPiece.type = 'queen';
    }

    selected = null;

    if (captured && captured.type === 'king') {
      gameOver = true;
      setStatus(`${label(current)} venceu! Capturou o rei! 👑🏆`);
      render();
      return;
    }

    current = opponentOf(current);
    setStatus(`Vez do jogador ${label(current)}`);
    render();
  }

  function restart() {
    setupBoard();
    current = 'vermelho';
    selected = null;
    gameOver = false;
    setStatus(`Vez do jogador ${label(current)}`);
    render();
  }

  restartBtn.addEventListener('click', restart);
  restart();
})();
