"""Funtastic World - site fictício de um salão de jogos para crianças."""
from flask import Flask, render_template, request

from games.sudoku import generate_puzzle

app = Flask(__name__)

CONTACTO = {
    "endereco": "Rua da Diversão, nº 10",
    "cidade": "1234-567 GameCity",
    "horario": "Segunda a Domingo, 10h00 às 22h00",
    "instagram": "@funtasticworld",
    "site": "www.funtasticworld.pt",
}


@app.context_processor
def inject_contacto():
    return {"contacto": CONTACTO}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/jogos")
def jogos():
    return render_template("jogos.html")


@app.route("/jogos/galo")
def jogo_galo():
    return render_template("jogo_galo.html")


@app.route("/jogos/damas")
def jogo_damas():
    return render_template("jogo_damas.html")


@app.route("/jogos/xadrez")
def jogo_xadrez():
    return render_template("jogo_xadrez.html")


@app.route("/jogos/sudoku")
def jogo_sudoku():
    dificuldade = request.args.get("dificuldade", "facil")
    if dificuldade not in ("facil", "medio"):
        dificuldade = "facil"
    puzzle, solucao = generate_puzzle(dificuldade)
    return render_template(
        "jogo_sudoku.html",
        puzzle=puzzle,
        solucao=solucao,
        dificuldade=dificuldade,
    )


if __name__ == "__main__":
    app.run(debug=True)
