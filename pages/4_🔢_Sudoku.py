"""Funtastic World — Sudoku (Streamlit)."""
import json

import streamlit as st
import streamlit.components.v1 as components

from games.sudoku import generate_puzzle
from streamlit_common import page_shell

st.set_page_config(page_title="Sudoku | Funtastic World", page_icon="🔢", layout="centered")

st.markdown("## 🔢 SUDOKU")
st.caption("Preenche a grelha com números de 1 a 9, sem repetir número em nenhuma linha, coluna ou quadrado 3x3!")

col1, col2, _ = st.columns([1, 1, 2])
with col1:
    dificuldade = st.radio("Dificuldade", ["facil", "medio"], horizontal=True,
                            format_func=lambda d: "😀 Fácil" if d == "facil" else "🤔 Médio",
                            label_visibility="collapsed")
with col2:
    st.button("🔄 Nova Grelha")

puzzle, solucao = generate_puzzle(dificuldade)

rows_html = ""
for row in range(9):
    for col in range(9):
        value = puzzle[row][col]
        row_class = "sudoku-row-3" if row % 3 == 2 else ""
        disabled = "disabled" if value != 0 else ""
        rows_html += (
            f'<input type="text" inputmode="numeric" maxlength="1" '
            f'data-row="{row}" data-col="{col}" class="{row_class}" '
            f'value="{value if value != 0 else ""}" {disabled}>'
        )

BODY = f"""
<section class="game-page">
  <div class="game-toolbar">
    <button class="btn btn--blue" id="checkBtn">✅ Verificar</button>
    <button class="btn btn--outline" id="solveBtn">👀 Mostrar Solução</button>
  </div>

  <p class="game-status" id="status">Boa sorte! 🍀</p>

  <div class="board-sudoku" id="board">{rows_html}</div>

  <script id="solutionData" type="application/json">{json.dumps(solucao)}</script>
</section>
"""

components.html(page_shell(BODY, js_files=("sudoku.js",)), height=750, scrolling=True)
