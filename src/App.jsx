import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

import { useState } from "react";

const PLAYERS = {
  X:'Player 1',
    O:'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(playerArray) {
  let currentPlayer = "X";

  // Switch active player
  if (playerArray.length > 0 && playerArray[0].playerName === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function getGameBoard(playerArray) {
  // creating a copy of initial game board
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const player of playerArray) {
    const { cell, playerName } = player;
    gameBoard[cell.row][cell.col] = playerName;
  }
  return gameBoard;
}

function getWinner(gameBoard, player) {
  let isWinner;

  // check for winner
  for(const combination of WINNING_COMBINATIONS) {
    const [firstCell, secondCell, thirdCell] = combination;
    const firstSymbol = gameBoard[firstCell.row][firstCell.column];
    const secondSymbol = gameBoard[secondCell.row][secondCell.column];
    const thirdSymbol = gameBoard[thirdCell.row][thirdCell.column];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      secondSymbol === thirdSymbol
    ) {
      isWinner = player[firstSymbol];
    }
  }
  return isWinner;
}

function App() {
  const [player, setPlayer] = useState(PLAYERS);
  const [playerArray, setPlayerArray] = useState([]);

  const activePlayer = getActivePlayer(playerArray);
  const gameBoard = getGameBoard(playerArray);
  const isWinner = getWinner(gameBoard, player);

  // check for draw
  const isDraw = playerArray.length === 9 && !isWinner;

  function handleActivePlayer(rowIndex, colIndex) {
    setPlayerArray((prevPlayerArray) => {
      const currentPlayer = getActivePlayer(prevPlayerArray);

      // After every turn, update the playerArray
      const updatedPlayerArray = [
        { cell: { row: rowIndex, col: colIndex }, playerName: currentPlayer },
        ...prevPlayerArray,
      ];

      return updatedPlayerArray;
    });
  }

  function restart() {
    setPlayerArray([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayer(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onNameChange={handlePlayerNameChange}/>
        </ol>
        {(isWinner || isDraw) && <GameOver winner={isWinner} onEnd={restart}/>}
        <GameBoard onSquareSelect={handleActivePlayer} board={gameBoard} />
      </div>
      <Log players={playerArray} />
    </main>
  );
}

export default App;
