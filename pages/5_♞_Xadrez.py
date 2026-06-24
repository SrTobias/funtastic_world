"""Funtastic World — Xadrez simplificado (Streamlit)."""
import streamlit as st
import streamlit.components.v1 as components

from streamlit_common import page_shell

st.set_page_config(page_title="Xadrez | Funtastic World", page_icon="♟️", layout="centered")

BODY = """
<section class="game-page">
  <h1>♟️ XADREZ</h1>
  <p class="game-page__intro">
    Versão simplificada para te divertires: move as peças como no xadrez normal e
    <strong>captura o rei adversário para ganhar</strong> — sem roque, sem "en passant" e sem regras complicadas!
  </p>

  <div class="game-toolbar">
    <button class="btn btn--green" id="restartBtn">🔄 Reiniciar Jogo</button>
  </div>

  <p class="game-status" id="status">Vez do jogador 🔴 Vermelho</p>

  <div class="board-8" id="board"></div>
</section>
"""

components.html(page_shell(BODY, js_files=("xadrez.js",)), height=900, scrolling=True)
