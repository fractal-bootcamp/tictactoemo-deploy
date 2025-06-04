import { pgTable, jsonb, varchar, char, boolean } from 'drizzle-orm/pg-core'
import type { Board } from '../game.ts'

export const gamesTable = pgTable('tictactoemoGames', {
  id: varchar({ length: 255 }).primaryKey(),
  currentPlayer: char().notNull(),
  board: jsonb().$type<Board>().notNull(),
  done: boolean().notNull(),
  contextMessage: varchar({ length: 255 }).notNull()
});
