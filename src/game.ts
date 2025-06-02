export type Cell = 'x' | 'o' | 'y' | null
export type Board = Cell[][]
export type Player = 'x' | 'o' | 'y'

export type Game = {
  currentPlayer: Player
  board: Board
  done: Boolean
  contextMessage: String
}

// Utility function for quickly glancing at the board
function logBoard(curGame: Game) {
  for (let y = 0; y < 3; y++) {
    console.log(curGame.board[y])
  }
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
    } else {
      // the player who last moved won!
      newGame.done = true
      newGame.contextMessage = `Player ${newGame.currentPlayer} has won`
      console.log('WIN!')
      return newGame
    }

  } else {
    return {...curGame, contextMessage: 'Cell Already Occupied'}
  }
}

export function checkWin(curGame: Game): Boolean {
  console.log("Checking for a win on this board:")
  logBoard(curGame)
  // check for a vertical win
  for (let x = 0; x < 3; x++) {
    const cols = [
      curGame.board[0][x],
      curGame.board[1][x],
      curGame.board[2][x]
    ]
    //console.log(`cols checked: ${cols}`)
    if (cols.every(val => val !== null) && new Set(cols).size === 1) {
      console.log('Win found')
      return true
    }
  }

  // check for a left-set horizontal win
  for (let y = 0; y < 2; y++) {
    const leftRows = [
      curGame.board[y][0],
      curGame.board[y][1],
      curGame.board[y][2]
    ]
    //console.log(`Left rows checked: ${leftRows}`)
    if (leftRows.every(val => val !== null) && new Set(leftRows).size === 1) {
      console.log('Win found')
      return true
    }
  }

  // check for a right-set horizontal win
  for (let y = 0; y < 2; y++) {
    const rightRows = [
      curGame.board[y][1],
      curGame.board[y][2],
      curGame.board[y][3]
    ]
    //console.log(`Right rows checked: ${rightRows}`)
    if (rightRows.every(val => val !== null) && new Set(rightRows).size === 1) {
      console.log('Win found')
      return true
    }
  }

  // check for a negative slope diag win
 for (let i = 0; i < 2; i++)  {
  const negDiags = [
    curGame.board[0][0+i],
    curGame.board[1][1+i],
    curGame.board[2][2+i]
  ]
  //console.log(`Negative slope diagonals checked: ${negDiags}`)
  if (negDiags.every(val => val !== null) && new Set(negDiags).size === 1) {
    console.log('Win found')
    return true
  }
 }

 // check for a positive slope diag win 
 for (let i = 0; i < 2; i++) {
  const posDiags = [
    curGame.board[0][2+i],
    curGame.board[1][1+i],
    curGame.board[2][0+i]
  ]
  console.log(`Positive slope diagonals checked: ${posDiags}`)
  if (posDiags.every(val => val !== null) && new Set(posDiags).size === 1) {
    console.log('Win found')
    return true
  }
 }

  console.log('No win')
  return false
}
