(() => {
  const solution = JSON.parse(document.getElementById('solutionData').textContent);
  const inputs = Array.from(document.querySelectorAll('#board input'));
  const statusEl = document.getElementById('status');
  const checkBtn = document.getElementById('checkBtn');
  const solveBtn = document.getElementById('solveBtn');

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const digits = input.value.replace(/[^1-9]/g, '');
      input.value = digits.slice(0, 1);
      input.classList.remove('cell-right', 'cell-wrong');
    });
  });

  function checkBoard() {
    let filled = 0;
    let wrong = 0;

    inputs.forEach((input) => {
      const row = Number(input.dataset.row);
      const col = Number(input.dataset.col);
      if (input.disabled) return;
      if (!input.value) {
        input.classList.remove('cell-right', 'cell-wrong');
        return;
      }
      filled += 1;
      const correct = Number(input.value) === solution[row][col];
      input.classList.toggle('cell-right', correct);
      input.classList.toggle('cell-wrong', !correct);
      if (!correct) wrong += 1;
    });

    const totalEmpty = inputs.filter((i) => !i.disabled).length;
    if (wrong === 0 && filled === totalEmpty) {
      statusEl.textContent = 'Parabéns! Resolveste o Sudoku! 🎉🏆';
    } else if (wrong > 0) {
      statusEl.textContent = `Hmm, há ${wrong} número(s) errado(s). Tenta outra vez! 🤔`;
    } else {
      statusEl.textContent = `Continua! Faltam ${totalEmpty - filled} casas. 💪`;
    }
  }

  function revealSolution() {
    inputs.forEach((input) => {
      const row = Number(input.dataset.row);
      const col = Number(input.dataset.col);
      input.value = solution[row][col];
      input.disabled = true;
      input.classList.remove('cell-right', 'cell-wrong');
    });
    statusEl.textContent = 'Aqui está a solução! Repara bem para a próxima. 👀';
  }

  checkBtn.addEventListener('click', checkBoard);
  solveBtn.addEventListener('click', revealSolution);
})();
