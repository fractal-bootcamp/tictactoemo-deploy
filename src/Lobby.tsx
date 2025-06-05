import { Link, useLoaderData } from 'react-router'
import type { Game } from './game'
import { useState } from 'react'

export function Lobby() {
  const { pendingGames: initialGamesList } = useLoaderData<{ pendingGames: string[] }>()

  const [gamesList, setGamesList] = useState(initialGamesList)

  return (
    <div className="flex flex-col min-h-screen gap-4 justify-center items-center bg-gray-100">
      <div className="font-bold">
        Welcome to TicTacToeMo
      </div>
      <div>
        Open Games
      </div>
      {gamesList.map((gameId) => (
        <div key={gameId} className="text-xs">
          <Link to={`/games/${gameId}`}>{gameId}</Link>
        </div>
      ))}
    </div >
  )
}