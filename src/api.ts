import type { Game } from "./game.ts"
import { generateInitialGame, move } from "./game.ts"

export interface TicTacToeMoApi {
  // Function which generates a new game
  createGame(): Promise<Game>

  // Function which retrieves a game associated with a given gameId
  getGame(gameId: String): Promise<Game>

  // Function which delivers a move to a game
  makeMove(gameId: String, x: number, y: number): Promise<Game>
}

export class InMemoryTicTacToeMoApi implements TicTacToeMoApi {
  private games: Map<String, Game> = new Map()

  async createGame(): Promise<Game> {
    const game = generateInitialGame()
    this.games.set(game.id, game)
    return game;
  }

  async getGame(gameId: String): Promise<Game> {
    const game = this.games.get(gameId)
    if (!game) {
      throw new Error(`No game with ID ${gameId} found`)
    } else {
      return game;
    }
  }

  async makeMove(gameId: String, x: number, y: number): Promise<Game> {
    const curGame = await this.getGame(gameId)
    const newGame = move(curGame, x, y)
    this.games.set(gameId, newGame)
    return newGame
  }
}

export class TicTacToeMoApiClient implements TicTacToeMoApi {
  async createGame(): Promise<Game> {
    const res = await fetch("/api/games")
    const game = await res.json()
    return game
  }

  async getGame(gameId: String): Promise<Game> {
    const res = await fetch(`/api/games/${gameId}`)
    const game = await res.json()
    return game
  }

  async makeMove(gameId: String, x: number, y: number): Promise<Game> {
    const res = await fetch(`/api/games/${gameId}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ x, y })
    })
    const game = await res.json()
    return game
  }
}

