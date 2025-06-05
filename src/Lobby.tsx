import { Link, useLoaderData } from 'react-router'
import { useState } from 'react'

export function Lobby() {
  const { pendingGames: initialGamesList } = useLoaderData<{ pendingGames: string[] }>()

  const [gamesList, setGamesList] = useState(initialGamesList)

  const gameIconClass = "flex outline-2 aspect-square w-16 justify-center items-center bg-gray-200 hover:bg-gray-300"

  return (
    <div className="flex flex-col min-h-screen pb-4 gap-4 justify-center items-center bg-gray-100">
      <div className="font-bold">
        Welcome to TicTacToeMo
      </div>
      <Link className="flex outline-2 h-8 w-32 justify-center items-center bg-gray-200 hover:bg-gray-300" to="/game/newGame">
        Create a Game
      </Link>
      <div>
        Or join an open game --
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-w-fit">
        {
          gamesList.map((gameId) => (
            <div key={gameId} className="text-xs">
              <Link className={gameIconClass} to={`/game/${gameId}`}>{gameId.slice(0, 3)}</Link>
            </div>
          ))
        }
      </div>
    </div >
  )
}