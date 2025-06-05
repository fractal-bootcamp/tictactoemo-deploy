import { Link } from 'react-router'

export function NewGameButton() {
  const classString = "flex outline-2 h-8 w-24 justify-center items-center bg-gray-200 hover:bg-gray-300";

  return (
    <Link className={classString} to="/game/new">
      New Game
    </Link>
  )
}
