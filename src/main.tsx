import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { TicTacToeMoApiClient } from './api'
import { Lobby } from './Lobby.tsx'
import { GameView } from './GameView.tsx'
import App from './App.tsx'
import './index.css'

const api = new TicTacToeMoApiClient()

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: Lobby,
        loader: async () => {
          const pendingGames = await api.getPendingGames()
          return { pendingGames }
        }
      },
      {
        path: '/game',
        Component: GameView
      }
    ]
  },
  {
    path: '/games/:gameId',
    Component: GameView,
    loader: async ({ params }) => {
      if (!params.gameId) {
        throw new Error("Game ID is required")
      }
      const game = await api.getGame(params.gameId)
      return { game }
    }
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
