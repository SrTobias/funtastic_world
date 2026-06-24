"""Funtastic World — versão Streamlit (página Início)."""
import streamlit as st
import streamlit.components.v1 as components

from app import CONTACTO
from streamlit_common import footer_html, page_shell

st.set_page_config(page_title="Funtastic World", page_icon="🎮", layout="centered")

HERO_BODY = """
<section class="hero">
  <span class="badge-tag">DIVERSÃO SEM LIMITES! ✨</span>

  <div class="hero__logo">
    <div class="logo-line logo-line--1">
      <span class="logo-letter logo-letter--grass">F</span><span class="logo-letter logo-letter--grass">U</span><span class="logo-letter logo-letter--grass">N</span><span class="logo-letter logo-letter--grass">T</span><span class="logo-letter logo-letter--grass">A</span><span class="logo-letter logo-letter--grass">S</span><span class="logo-letter logo-letter--grass">T</span><span class="logo-letter logo-letter--grass">I</span><span class="logo-letter logo-letter--grass">C</span>
    </div>
    <div class="logo-line logo-line--2">
      <span class="logo-letter logo-letter--blue">W</span><span class="logo-ball">🏀</span><span class="logo-letter logo-letter--red">R</span><span class="logo-letter logo-letter--yellow">L</span><span class="logo-letter logo-letter--green">D</span>
    </div>
  </div>

  <div class="hero__banners">
    <p class="banner banner--navy">JOGA. DIVERTE-TE. PARTILHA.</p>
    <p class="banner banner--green">PARA TODAS AS IDADES!</p>
  </div>

  <div class="hero__panel">
    <h2>A TUA NOVA <span class="text-green">EXPERIÊNCIA</span><br>DE JOGO!</h2>
    <p>A Funtastic World é muito mais do que um salão de jogos. É um lugar onde a diversão, a amizade e a competição saudável se encontram!</p>
    <span class="hero__controller" aria-hidden="true">🎮</span>
  </div>
</section>

<section class="gallery">
  <div class="polaroid polaroid--1">
    <div class="polaroid__img polaroid__img--arcade">🕹️</div>
    <p>Sala de arcade</p>
  </div>
  <div class="polaroid polaroid--2">
    <div class="polaroid__img polaroid__img--console">🎮</div>
    <p>Consolas e desporto</p>
  </div>
  <div class="polaroid polaroid--3">
    <div class="polaroid__img polaroid__img--board">🎲</div>
    <p>Jogos de tabuleiro</p>
  </div>
</section>

<section class="features">
  <div class="features__list">
    <h2 class="features__title">O QUE ENCONTRAS AQUI?</h2>

    <div class="feature-card">
      <span class="feature-icon feature-icon--green">🎮</span>
      <div>
        <h3>Jogos para todos</h3>
        <p>Arcade, consolas, desporto, tabuleiro e muito mais!</p>
      </div>
    </div>

    <div class="feature-card">
      <span class="feature-icon feature-icon--red">👨‍👩‍👧‍👦</span>
      <div>
        <h3>Espaço para amigos e família</h3>
        <p>Diversão garantida para todas as idades.</p>
      </div>
    </div>

    <div class="feature-card">
      <span class="feature-icon feature-icon--yellow">🏆</span>
      <div>
        <h3>Eventos e torneios</h3>
        <p>Participa, desafia e ganha prémios incríveis!</p>
      </div>
    </div>

    <div class="feature-card">
      <span class="feature-icon feature-icon--blue">🎁</span>
      <div>
        <h3>Promoções e novidades</h3>
        <p>Novos jogos, ofertas especiais e muito mais!</p>
      </div>
    </div>
  </div>

  <div class="features__side">
    <p class="features__epic">VEM<br><span class="text-green">VIVER</span><br>MOMENTOS<br><span class="text-red">ÉPICOS!</span></p>
    <div class="kids-badge">
      <span>👍</span>
      <p>CRIADO POR <span class="text-green">CRIANÇAS</span>, PENSADO PARA <span class="text-blue">TODOS!</span></p>
    </div>
  </div>
</section>
"""

components.html(page_shell(HERO_BODY), height=1750, scrolling=False)

st.markdown("### 🌟 Joga agora!")
st.caption("Usa o menu à esquerda para escolher um jogo.")
cols = st.columns(4)
with cols[0]:
    st.page_link("pages/1_🎲_Jogos.py", label="Ver todos os jogos", icon="🎲")
with cols[1]:
    st.page_link("pages/2_⭕_Jogo_do_Galo.py", label="Jogo do Galo", icon="⭕")
with cols[2]:
    st.page_link("pages/4_🔢_Sudoku.py", label="Sudoku", icon="🔢")
with cols[3]:
    st.page_link("pages/5_♞_Xadrez.py", label="Xadrez", icon="♟️")

components.html(page_shell(footer_html(CONTACTO)), height=320, scrolling=False)
