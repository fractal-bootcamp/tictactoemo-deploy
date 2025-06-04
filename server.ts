import express from "express"
import ViteExpress from "vite-express";
import { InMemoryTicTacToeMoApi } from "./src/api.ts"
import { DbTicTacToeMo } from "./src/db/db.ts"

const app = express();
app.use(express.json());
const api = new DbTicTacToeMo();

app.get("/message", (req, res) => {
  res.status(200).send("Hello World")
})

app.get("/api/games", async (req, res) => {
  try {
    const newGame = await api.createGame()
    res.status(200).json(newGame)
  } catch {
    res.status(404).json({ error: `Error fetching new game` })
  }
})

app.get("/api/games/:id", async (req, res) => {
  try {
    const requestedGame = await api.getGame(req.params.id)
    res.status(200).json(requestedGame)
  } catch {
    res.status(404).json({ error: `Error fetching existing game` })
  }
})

app.post("/api/games/:id/move", async (req, res) => {
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

ViteExpress.listen(app, 3000, () => console.log("server is listening"))