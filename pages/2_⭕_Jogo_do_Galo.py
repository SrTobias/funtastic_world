"""Funtastic World — Jogo do Galo (Streamlit)."""
import streamlit as st
import streamlit.components.v1 as components

from streamlit_common import page_shell

st.set_page_config(page_title="Jogo do Galo | Funtastic World", page_icon="⭕", layout="centered")

CELLS = "".join(
    f'<button type="button" class="cell-galo" data-index="{i}" aria-label="Casa {i + 1}"></button>'
    for i in range(9)
)

BODY = f"""
<section class="game-page">
  <h1>⭕ JOGO DO GALO ❌</h1>
  <p class="game-page__intro">Alinha 3 símbolos em linha, coluna ou diagonal para venceres!</p>

  <div class="game-toolbar">
    <button class="btn btn--outline" id="modePvp">👫 2 Jogadores</button>
    <button class="btn btn--outline" id="modeCpu">🤖 Contra o computador</button>
    <button class="btn btn--green" id="restartBtn">🔄 Reiniciar</button>
  </div>

  <p class="game-status" id="status">Vez do jogador X</p>

  <div class="board-galo" id="board">
    {CELLS}
  </div>
</section>
"""

components.html(page_shell(BODY, js_files=("galo.js",)), height=700, scrolling=True)
