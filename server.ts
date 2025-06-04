import express from "express"
import ViteExpress from "vite-express";
import { InMemoryTicTacToeMoApi } from "./src/api.ts"

const app = express();
app.use(express.json());
const api = new InMemoryTicTacToeMoApi()

app.get("/message", (req, res) => {
  res.status(200).send("Hello World")
})

app.get("/api/games", async (req, res) => {
  const newGame = await api.createGame()
  res.status(200).json(newGame)
})

app.get("/api/games/:id", async (req, res) => {
  const requestedGame = await api.getGame(req.params.id)
  res.status(200).json(requestedGame)
})

app.post("/api/games/:id/move", async (req, res) => {
  if ('x' in req.body && 'y' in req.body) {
    const updatedGame = await api.makeMove(req.params.id, req.body.x, req.body.y)
    res.status(200).json(updatedGame)
  } else {
    res.status(400).send('incorrect parameters')
  }
})

ViteExpress.listen(app, 3000, () => console.log("server is listening"))