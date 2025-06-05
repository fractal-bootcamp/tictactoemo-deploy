import { Link, useLoaderData } from 'react-router'
import { useState } from 'react'

export function Lobby() {
  const { pendingGames: initialGamesList } = useLoaderData<{ pendingGames: string[] }>()

  const [gamesList, setGamesList] = useState(initialGamesList)

  return (
    <div className="flex flex-col min-h-screen gap-4 justify-center items-center bg-gray-100">
      <div className="font-bold">
        Welcome to TicTacToeMo
      </div>
      <Link className="flex outline-2 h-8 w-32 justify-center items-center bg-gray-200" to="/game/newGame">
        Create a Game
      </Link>
      <div>
        Or join an open game --
      </div>
      {
        gamesList.map((gameId) => (
          <div key={gameId} className="text-xs">
            <Link to={`/game/${gameId}`}>{gameId}</Link>
          </div>
        ))
      }
    </div >
  )
}