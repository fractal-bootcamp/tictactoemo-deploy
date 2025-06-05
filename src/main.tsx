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
        Component: Lobby
      },
      {
        path: '/game',
        Component: GameView
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
