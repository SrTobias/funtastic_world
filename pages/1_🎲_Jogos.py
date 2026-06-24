"""Funtastic World — hub de jogos (Streamlit)."""
import streamlit as st
import streamlit.components.v1 as components

from streamlit_common import page_shell

st.set_page_config(page_title="Jogos | Funtastic World", page_icon="🎲", layout="centered")

HEADER_BODY = """
<section class="page-header">
  <h1>OS NOSSOS <span class="text-green">JOGOS</span> 🎲</h1>
  <p>Escolhe um jogo no menu à esquerda e diverte-te! Podes jogar sozinho ou com um amigo no mesmo computador.</p>
</section>
"""

components.html(page_shell(HEADER_BODY), height=180, scrolling=False)

GAMES = [
    ("⭕", "Jogo do Galo", "2 jogadores ou contra o computador", "pages/2_⭕_Jogo_do_Galo.py"),
    ("⚪", "Damas", "O clássico jogo de tabuleiro, 2 jogadores", "pages/3_⚪_Damas.py"),
    ("🔢", "Sudoku", "Preenche a grelha com números de 1 a 9", "pages/4_🔢_Sudoku.py"),
    ("♟️", "Xadrez", "Versão simplificada, fácil de aprender", "pages/5_♞_Xadrez.py"),
]

cols = st.columns(2)
for index, (icon, name, description, page) in enumerate(GAMES):
    with cols[index % 2]:
        with st.container(border=True):
            st.markdown(f"## {icon} {name}")
            st.caption(description)
            st.page_link(page, label=f"Jogar {name}", icon=icon)
