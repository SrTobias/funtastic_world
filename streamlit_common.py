"""Utilitários partilhados pelas páginas Streamlit do Funtastic World."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CSS = (ROOT / "static" / "css" / "style.css").read_text()

FONTS_LINK = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800'
    '&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">'
)


def page_shell(body: str, js_files: tuple = ()) -> str:
    """Envolve o conteúdo de uma página de jogo num documento HTML autónomo,
    reutilizando o style.css e os ficheiros JS do site Flask original."""
    scripts = "".join(
        f"<script>{(ROOT / 'static' / 'js' / name).read_text()}</script>"
        for name in js_files
    )
    return f"""<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
{FONTS_LINK}
<style>
{CSS}
html, body {{ background: var(--bg); margin: 0; padding: 0.5rem 0 1.5rem; }}
</style>
</head>
<body>
{body}
{scripts}
</body>
</html>"""


def footer_html(contacto: dict) -> str:
    return f"""
<footer class="footer" style="margin-top: 2.5rem;">
  <div class="footer__grid">
    <div class="footer__panel footer__panel--navy">
      <h3>JUNTA-TE A NÓS!</h3>
      <p>Acompanha-nos nas redes sociais e não percas nada do que acontece na <strong>Funtastic World</strong>!</p>
      <div class="social-row">
        <span class="social-icon" title="Instagram">📷</span>
        <span class="social-icon" title="Facebook">👍</span>
        <span class="social-icon" title="TikTok">🎵</span>
        <span class="social-icon" title="YouTube">▶️</span>
      </div>
      <p class="footer__handle">{contacto['instagram']}</p>
    </div>
    <div class="footer__panel footer__panel--green">
      <p class="footer__visit">VISITA O NOSSO SITE!</p>
      <p class="footer__site">{contacto['site']}</p>
    </div>
    <div class="footer__panel footer__panel--red">
      <p><span class="footer__icon">📍</span><strong>ONDE ESTAMOS?</strong><br>{contacto['endereco']}<br>{contacto['cidade']}</p>
      <p><span class="footer__icon">🕑</span><strong>HORÁRIO</strong><br>{contacto['horario']}</p>
    </div>
  </div>
  <div class="footer__bottom">ESPERAMOS POR TI! 🌟</div>
</footer>
"""
