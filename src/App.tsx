import { useState } from 'react'
import { Cell, Board, Player, Game } from './game.ts'
import { generateInitialGame, move } from './game.ts'

type CellProps = {
  game: Game
  x: number
  y: number
}
function Cell({game, x, y}: CellProps) {
  if (game.board[y][x] === null) {
    return `${x}, ${y}`
  } else {
    return game.board[y][x]
  }
}

function App() {
  const [game, setGame] = useState(generateInitialGame())
  console.log(game)
  return (
    <div>
      <h1>Tic Tac Toe Mo</h1>
      <div>
        {
          game.board.map((row, rowIndex) =>
            row.map((cell, cellIndex) =>
              <div 
                key={`${cellIndex}, ${rowIndex}`}
                onClick={() => setGame(move(game, cellIndex, rowIndex))}
              > 
                <Cell game={game} x={cellIndex} y={rowIndex} />
              </div>
            ))
        }
      </div>
      <p>
        It's {game.currentPlayer}'s turn!
      </p>
    </div>
  )
}


export default App
