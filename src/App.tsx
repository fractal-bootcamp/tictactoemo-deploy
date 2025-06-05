import { GameView } from './GameView.tsx'
import { Lobby } from './Lobby.tsx'
import { Outlet } from 'react-router';

function App() {
  return (
    <div>
      <h2>YEAH WE PLAYING TICTACTOEMO</h2>
      <Outlet />
    </div>
  )
}


export default App
