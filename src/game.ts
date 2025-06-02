export type Cell = 'x' | 'o' | 'y' | null
export type Board = Cell[][]
export type Player = 'x' | 'o' | 'y'

export type Game = {
  currentPlayer: Player
  board: Board
  done: Boolean
  contextMessage: String
}

export function generateInitialGame(): Game {
  const newGame: Game = {
    currentPlayer: 'x',
    board: [[null, null, null, null],[null, null, null, null],[null, null, null, null]],
    done: false,
    contextMessage: "New Game",
  }
  return newGame
}

export function move(curGame: Game, cellx: number, celly: number): Game {

  // if the cell is as-of-yet unclicked
  if (curGame.board[celly][cellx] === null) {
    // create a structured clone
    const newGame = structuredClone(curGame)

    // set the value of the cell to the current player's identifier
    newGame.board[celly][cellx] = newGame.currentPlayer

    // check if the game has been won
    // if it hasn't...
    if (!checkWin(newGame)) {
      // move to the next player
      if (newGame.currentPlayer === 'x') {
        newGame.currentPlayer = 'o';
      } else if (newGame.currentPlayer === 'o') {
        newGame.currentPlayer = 'y';
      } else if (newGame.currentPlayer === 'y') {
        newGame.currentPlayer = 'x';
      }
      // Set the context messages
      newGame.contextMessage = `Now advancing to ${newGame.currentPlayer}'s turn`
      // return the game
      return newGame
    }

    return newGame
  } else {
    return {...curGame, contextMessage: 'Cell Already Occupied'}
  }
}

export function checkWin(game: Game): Boolean {
  // Placeholder, no logic for the end of the game yet
  return false
}