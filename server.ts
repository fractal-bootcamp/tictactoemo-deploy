import express from "express"
import ViteExpress from "vite-express";
import { InMemoryTicTacToeMoApi } from "./src/api.ts"
import { DbTicTacToeMo } from "./src/db/db.ts"

const app = express();
const PORT = 3000;

app.use(express.json());
const api = new DbTicTacToeMo();

app.get("/api/newGame", async (req, res) => {
  try {
    const newGame = await api.createGame()
    res.status(200).json(newGame)
  } catch {
    res.status(404).json({ error: `Error fetching new game` })
  }
})

app.get("/api/pendingGames", async (req, res) => {
  try {
    const gamesList = await api.getPendingGames()
    res.status(200).json(gamesList)
  } catch {
    res.status(404).json({ error: `Error fetching gamesList` })
  }
})

app.get("/api/game/:id", async (req, res) => {
  try {
    const requestedGame = await api.getGame(req.params.id)
    res.status(200).json(requestedGame)
  } catch {
    res.status(404).json({ error: `Error fetching existing game` })
  }
})

app.post("/api/game/:id/move", async (req, res) => {
  try {
    if ('x' in req.body && 'y' in req.body) {
      const updatedGame = await api.makeMove(req.params.id, req.body.x, req.body.y)
      res.status(200).json(updatedGame)
    } else {
      res.status(400).json({ error: `Error posting move to game` })
    }
  } catch {
    res.status(404).send({ error: `Error posting move to game` })
  }
})

ViteExpress.listen(app, PORT, () => console.log(`Server is listening at http://localhost:${PORT}`))