import { useEffect } from 'react'
import { Link, useLoaderData } from 'react-router'
import { NewGameButton } from './NewGameButton'
import { useState } from 'react'

export function Lobby() {
  const { pendingGames: initialGamesList } = useLoaderData<{ pendingGames: string[] }>()

  const [gamesList, setGamesList] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    setGamesList(initialGamesList)
  }, [initialGamesList])

  const gameIconClass = "flex outline-2 aspect-square w-16 justify-center items-center bg-gray-200 hover:bg-gray-300"

  if (!gamesList) {
    return (
      <div className="font-bold">
        Loading...
      </div>
    )
  } else {
    return (
      <div className="flex flex-col min-h-screen pb-4 gap-4 justify-center items-center bg-gray-100">
        <div className="font-bold">
          Welcome to TicTacToeMo
        </div>
        <NewGameButton />
        <div>
          Or join a game in progress --
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-w-fit">
          {
            gamesList.sort().map((gameId) => (
              <div key={gameId} className="text-xs">
                <Link className={gameIconClass} to={`/game/${gameId}`}>{gameId.slice(0, 3)}</Link>
              </div>
            ))
          }
        </div>
      </div >
    )
  }
}