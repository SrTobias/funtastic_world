"""Gerador de puzzles de Sudoku 9x9 para o site Funtastic World."""
import random

SIZE = 9
BOX = 3

DIFFICULTY_HOLES = {
    "facil": 35,   # casas a remover (de 81)
    "medio": 48,
}


def _is_valid(grid, row, col, value):
    if value in grid[row]:
        return False
    if value in (grid[r][col] for r in range(SIZE)):
        return False
    box_row, box_col = (row // BOX) * BOX, (col // BOX) * BOX
    for r in range(box_row, box_row + BOX):
        for c in range(box_col, box_col + BOX):
            if grid[r][c] == value:
                return False
    return True


def _fill_grid(grid):
    for row in range(SIZE):
        for col in range(SIZE):
            if grid[row][col] != 0:
                continue
            values = list(range(1, SIZE + 1))
            random.shuffle(values)
            for value in values:
                if _is_valid(grid, row, col, value):
                    grid[row][col] = value
                    if _fill_grid(grid):
                        return True
                    grid[row][col] = 0
            return False
    return True


def _solved_grid():
    grid = [[0] * SIZE for _ in range(SIZE)]
    _fill_grid(grid)
    return grid


def generate_puzzle(difficulty="facil"):
    """Devolve (puzzle, solucao) como listas 9x9. 0 = casa vazia no puzzle."""
    holes = DIFFICULTY_HOLES.get(difficulty, DIFFICULTY_HOLES["facil"])
    solution = _solved_grid()
    puzzle = [row[:] for row in solution]

    cells = [(r, c) for r in range(SIZE) for c in range(SIZE)]
    random.shuffle(cells)
    for row, col in cells[:holes]:
        puzzle[row][col] = 0

    return puzzle, solution
