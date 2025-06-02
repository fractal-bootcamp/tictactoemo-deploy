export type Cell = 'x' | 'o' | 'y' | null
export type Board = Cell[][]
export type Player = 'x' | 'o' | 'y'
export type xRange = 0 | 1 | 2 | 3
export type yRange = 0 | 2 | 2

export type Game = {
  currentPlayer: Player
  board: Board
  done: Boolean
  contextMessage: String
}

export default function generateInitialGame(): Game {
  const newGame: Game = {
    currentPlayer: 'x',
    board: [[null, null, null, null],[null, null, null, null],[null, null, null, null]],
    done: false,
    contextMessage: "New Game",
  }
  return newGame
}

function move(curGame: Game, cellx: xRange, celly: yRange): Game {
  if (curGame.board[celly][cellx] === null) {
    const newGame = structuredClone(curGame)
    newGame.board[celly][cellx] = newGame.currentPlayer
    return newGame
  } else {
    return {...curGame, contextMessage: 'Cell Already Occupied'}
  }
}