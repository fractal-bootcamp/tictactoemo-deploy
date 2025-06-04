import type { Game } from "./game.ts"
import { generateInitialGame, move } from "./game.ts"

export interface TicTacToMoApi {
  // Function which generates a new game
  createGame(): Promise<Game>

  // Function which retrieves a game associated with a given gameId
  getGame(gameId: String): Promise<Game>

  // Function which delivers a move to a game
  makeMove(gameId: String, x: number, y: number): Promise<Game>
}

export class InMemoryTicTacToeMoApi implements TicTacToMoApi {
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