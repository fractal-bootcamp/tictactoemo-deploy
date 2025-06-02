import { useState } from 'react'
import { Cell, Board, Player, Game } from './game.ts'
import generateInitialGame from './game.ts'

function App() {
  const [game, setGame] = useState(generateInitialGame())
  console.log(game)
  return (
    <div>
      <h1>Tic Tac Toe Mo</h1>
      <div>
        {game.board.map(row => <div>{JSON.stringify(row)}</div>)}
      </div>
      <p>
        It's {game.currentPlayer}'s turn!
      </p>
    </div>
  )
}


export default App
