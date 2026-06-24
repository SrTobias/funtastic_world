# Funtastic World 🎮

Site fictício de um salão de jogos para crianças, inspirado no logótipo e flyer da marca **Funtastic World**. Inclui 4 mini-jogos jogáveis no browser: Jogo do Galo, Damas, Sudoku e Xadrez (versão simplificada).

O projeto está disponível em **duas versões**, a partir do mesmo código de jogos (HTML/CSS/JS):

| Versão | Ficheiro de entrada | Onde corre |
|---|---|---|
| **Flask** | `app.py` | Localmente, ou qualquer host com suporte a Flask (Render, Railway, PythonAnywhere, etc.) |
| **Streamlit** | `streamlit_app.py` + `pages/` | Localmente, ou [Streamlit Community Cloud](https://share.streamlit.io) |

## Funcionalidades

- **Início** — página de apresentação com o logótipo, cores e textos do flyer original.
- **Jogos** — hub com acesso aos 4 jogos.
- **⭕ Jogo do Galo** — 2 jogadores ou contra o computador (IA simples).
- **⚪ Damas** — regras clássicas, com capturas em cadeia e promoção a Dama.
- **🔢 Sudoku** — grelha 9x9 gerada em Python (dificuldade Fácil/Médio), com verificação e solução.
- **♟️ Xadrez** — movimentos clássicos de cada peça; versão simplificada (sem roque, "en passant" ou xeque-mate automático — vence quem capturar o rei adversário).

> Nota: a identidade visual (logótipo, cores, layout) foi recriada em CSS/HTML a partir do flyer fornecido — não são usados os ficheiros de imagem originais.

## Correr localmente

```bash
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Versão Flask

```bash
python app.py
```

Abre `http://127.0.0.1:5000`.

### Versão Streamlit

```bash
streamlit run streamlit_app.py
```

Abre `http://localhost:8501`. A navegação entre páginas é feita pela barra lateral do Streamlit.

## Publicar no Streamlit Community Cloud

1. Faz push deste repositório para o GitHub.
2. Em [share.streamlit.io](https://share.streamlit.io), cria uma nova app.
3. Define **Main file path** como `streamlit_app.py`.
4. O `requirements.txt` na raiz é instalado automaticamente — não é preciso configuração extra.

## Estrutura do projeto

```
app.py                  # App Flask (rotas, contacto, geração de Sudoku)
games/sudoku.py         # Gerador de puzzles de Sudoku (Python puro)
templates/               # Páginas HTML (Jinja2) usadas pela versão Flask
static/css/style.css     # Estilo e paleta de cores (partilhado pelas 2 versões)
static/js/               # Lógica de cada jogo (partilhada pelas 2 versões)

streamlit_app.py         # Página "Início" da versão Streamlit
streamlit_common.py      # Utilitários para embeber HTML/CSS/JS nas páginas Streamlit
pages/                   # Páginas da versão Streamlit (hub de jogos + 4 jogos)
.streamlit/config.toml   # Tema (cores) do Streamlit
```

## Tecnologias

- Python 3.9+, Flask, Streamlit
- HTML, CSS e JavaScript puro (sem frameworks de frontend) para a lógica dos jogos
