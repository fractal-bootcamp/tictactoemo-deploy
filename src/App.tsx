import { useState } from 'react'
import { type Game } from './game.ts'
import { generateInitialGame, move } from './game.ts'


type CellProps = {
  game: Game
  x: number
  y: number
}
function CellDisplay({game, x, y}: CellProps) {
  if (game.board[y][x] === null) {
    return null
  } else {
    return game.board[y][x]
  }}

function App() {
  const [game, setGame] = useState(generateInitialGame())
  console.log(game)
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Tic Tac Toe Mo</h1>
      <div className="grid grid-cols-4 gap-2 max-w-fit">
        {
          game.board.map((row, rowIndex) =>
            row.map((cell, cellIndex) =>
              <div 
                key={`${cellIndex}, ${rowIndex}`}
                onClick={() => setGame(move(game, cellIndex, rowIndex))}
                className="flex outline aspect-square w-16 justify-center items-center"
              > 
                <CellDisplay game={game} x={cellIndex} y={rowIndex} />
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
