import { useState, useEffect, useMemo } from 'react'
import { Link, useLoaderData } from 'react-router'
import { type Game } from './game.ts'
import { TicTacToeMoApiClient } from './api.ts'

// Utility function used to produced the class string for a cell at a given coordinate 
function getCellClassString(curGame: Game, x: number, y: number) {
  const baseClass = 'flex outline-2 aspect-square w-16 justify-center items-center'
  if (curGame.board[x][y] === 'x') {
    return baseClass + ' outline-red-800 bg-red-200';
  } else if (curGame.board[x][y] === 'o') {
    return baseClass + ' outline-blue-800 bg-blue-200';
  } else if (curGame.board[x][y] === 'y') {
    return baseClass + ' outline-green-800 bg-green-200';
  } else {
    return baseClass + ' bg-gray-200';
  }
}


type ContextDisplayProps = { contextMessage: string }
function ContextDisplay({ contextMessage }: ContextDisplayProps) {
  return (
    <div className="font-bold">
      {contextMessage}
    </div>
  )
}

type ResetButtonProps = { curGame: Game }
function ResetButton({ curGame }: ResetButtonProps) {
  let classString = "flex outline-2 h-8 w-24 justify-center items-center bg-gray-200"
  if (!curGame.done) {
    return (
      <div className={classString + " invisible"}></div>
    )
  } else {
    return (
      <div className={classString} onClick={() => window.location.reload()}>
        Rematch!
      </div>
    )
  }
}

type CellProps = {
  curGame: Game
  x: number
  y: number
}
function CellDisplay({ curGame, x, y }: CellProps) {
  if (curGame.board[y][x] === null) {
    return null
  } else {
    return curGame.board[y][x]
  }
}

export function GameView() {
  const api = useMemo(() => new TicTacToeMoApiClient(), [])

  const { game: incomingGame } = useLoaderData<{ game: Game }>()

  const [game, setGame] = useState<Game | undefined>(incomingGame)

  const restartGame = async () => {
    const newGame = await api.createGame()
    setGame(newGame)
  }

  const moveAndSetGame = async (id: string, x: number, y: number) => {
    const newGame = await api.makeMove(id, x, y)
    console.log(`Game obtained from moveAndSetGame: ${newGame}`)
    setGame(newGame);
  }

  if (!game) {
    return (
      <div>
        Now Loading...
      </div>
    )
  } else {
    return (
      <div className="flex flex-col min-h-screen gap-4 justify-center items-center bg-gray-100">
        <h1 className="font-bold">Tic Tac Toe Mo</h1>
        <h2 className="font-thin text-xs">{game.id}</h2>
        <div className="grid grid-cols-5 gap-2 max-w-fit">
          {
            game.board.map((row, rowIndex) =>
              row.map((cell, cellIndex) =>
                <div
                  key={`${cellIndex}, ${rowIndex}`}
                  onClick={() => moveAndSetGame(game.id, cellIndex, rowIndex)}
                  className={getCellClassString(game, rowIndex, cellIndex)}
                >
                  <CellDisplay curGame={game} x={cellIndex} y={rowIndex} />
                </div>
              ))
          }
        </div>
        <ContextDisplay contextMessage={game.contextMessage} />
        <ResetButton curGame={game} />
      </div >
    )
  }
}