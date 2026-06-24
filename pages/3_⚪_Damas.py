"""Funtastic World — Damas (Streamlit)."""
import streamlit as st
import streamlit.components.v1 as components

from streamlit_common import page_shell

st.set_page_config(page_title="Damas | Funtastic World", page_icon="⚪", layout="centered")

BODY = """
<section class="game-page">
  <h1>⚪ DAMAS 🔴</h1>
  <p class="game-page__intro">Move as tuas peças na diagonal e salta sobre as peças do adversário para as capturar. Quem chega à última linha vira Dama!</p>

  <div class="game-toolbar">
    <button class="btn btn--green" id="restartBtn">🔄 Reiniciar Jogo</button>
  </div>

  <p class="game-status" id="status">Vez do jogador 🔴 Vermelho</p>

  <div class="board-8" id="board"></div>
</section>
"""

components.html(page_shell(BODY, js_files=("damas.js",)), height=900, scrolling=True)
