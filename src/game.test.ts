import type { Game } from './game.ts'
import { checkTie, checkWin, generateInitialGame, move } from './game.ts'
import { test, expect } from 'vitest'

// checkTie() tests
test('checkTie: should return true if null is not present (all spaces are filled)', () => {
  // Setup the test harness
  const testGame = generateInitialGame()
  testGame.board = [['x', 'y', 'o', 'x', 'y'], ['x', 'y', 'o', 'x', 'y'], ['x', 'y', 'o', 'x', 'y']]
  // Execute the function
  const result = checkTie(testGame)
  // Verify the result
  expect(result).toBe(true)
})

test('checkTie: should return false if null is present (not all spaces are filled)', () => {
  // Setup the test harness
  const testGame = generateInitialGame()
  // Execute the function
  const result = checkTie(testGame)
  // Verify the result
  expect(result).toBe(false)
})

// move() tests
test('move: should return a Game identical to the curGame argument if the move is to an illegal position', () => {
  // Setup the test harness
  const testGame = generateInitialGame()
  testGame.board = [['x', 'y', 'o', 'x', 'y'], ['x', 'y', 'o', 'x', 'y'], [null, null, null, null, null]]
  // Execute the function
  const postMoveGame = move(testGame, 1, 1)
  const result = postMoveGame === testGame
  // Verify the result 
  expect(result).toBe(true)
})

test('move: the value of testGame.currentPlayer should be present at the move location post-move', () => {
  // Setup the test harness
  const testGame = generateInitialGame()
  const testPlayer = testGame.currentPlayer
  testGame.board = [[null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null]]
  // Execute the function
  const postMoveGame = move(testGame, 1, 1)
  const result = postMoveGame.board[1][1]
  // Verify the result
  expect(result).toBe(testPlayer)
})

// checkWin() tests
test('checkWin: the returned value should be false if no win is found', () => {
  // Setup the test harness
  const testGame = generateInitialGame()
  testGame.board = [['x', 'y', 'o', 'x', 'y'], ['x', 'y', 'o', 'x', 'y'], [null, null, null, null, null]]
  // Execute the function
  const result = checkWin(testGame)
  // Verify the result 
  expect(result).toBe(false)
})

// checkWin() tests
test('checkWin: the returned value should be true where any vertical three-in-a-row is present', () => {
  // Setup the test harness
  const testGameList: Game[] = []
  for (let i = 0; i < 5; i++) {
    const newTestGame = generateInitialGame()
    newTestGame.board[0][i] = 'x'
    newTestGame.board[1][i] = 'x'
    newTestGame.board[2][i] = 'x'
    testGameList.push(newTestGame)
  }
  // Execute the function
  const results: Boolean[] = []
  for (let testGame of testGameList) {
    results.push(checkWin(testGame))
  }
  // Verify the result
  expect(results).toStrictEqual([true, true, true, true, true])
})
