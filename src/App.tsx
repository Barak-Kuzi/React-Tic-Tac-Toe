import React, { Fragment, useState, SetStateAction } from 'react';

import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log"
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning_combination";

export interface Turns {
    square: {
        row: number,
        col: number
    }
    playerSymbol: PlayerSymbol
}

interface Players {
    X: string,
    O: string
}

export type PlayerSymbol = 'X' | 'O' | null;
const INITIAL_GAME_BOARD: PlayerSymbol[][] = [
    [null, null, null],     // 1. 1.1 1.2 1.3
    [null, null, null],     // 2. 2.1 2.2 2.3
    [null, null, null]     // 3. 3.1 3.2 3.3
]

const INITIAL_PLAYERS: Players = {
    X: 'Player 1',
    O: 'Player 2'
}

function deriveActivePlayer(gameTurns: Turns[]): PlayerSymbol {
    let currentPlayer: PlayerSymbol = 'X';
    if (gameTurns.length > 0 && gameTurns[0].playerSymbol === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns: Turns[]): PlayerSymbol[][] {
    let gameBoard: PlayerSymbol[][] = [...INITIAL_GAME_BOARD.map((innerArray: PlayerSymbol[]) => [...innerArray])];
    for (const turn of gameTurns) {
        const {square, playerSymbol}: {square:{row:number, col: number}, playerSymbol: PlayerSymbol} = turn;
        const {row, col}: {row:number, col: number} = square;

        gameBoard[row][col] = playerSymbol;
    }
    return gameBoard;
}


function deriveWinner(gameBoard: PlayerSymbol[][], players: Players): string | null {
    let winner: string | null = null;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol: PlayerSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol: PlayerSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol: PlayerSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol)
        {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

function App(): React.JSX.Element {
    const [gameTurns, setGameTurns]: [Turns[], React.Dispatch<SetStateAction<Turns[]>>]
        = useState([] as Turns[]);
    const [players, setPlayers]: [Players, React.Dispatch<SetStateAction<Players>>]
        = useState(INITIAL_PLAYERS)
    function handlePlayerNameChange(symbol: string, newName: string): void {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        })
    }

    const activePlayer: PlayerSymbol = deriveActivePlayer(gameTurns);

   const gameBoard: PlayerSymbol[][] = deriveGameBoard(gameTurns);

    const winner: string | null = deriveWinner(gameBoard, players);

    let hasDraw: boolean = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex: number, colIndex: number): void {

        setGameTurns((prevTurns: Turns[]) => {
            const currentPlayer: PlayerSymbol = deriveActivePlayer(prevTurns);
            const updatedTurns: Turns[] = [
                {
                    square: {row: rowIndex, col: colIndex},
                    playerSymbol: currentPlayer
                },
                ...prevTurns
            ];
            return updatedTurns
        })
    }

    function handleRestartMatch(): void {
        setGameTurns([] as Turns[]);
    }

    return (
        <Fragment>
          <Header />
          <main>
              <div id="game-container">
                  <ol id="players" className="highlight-player">
                    <Player initialName={INITIAL_PLAYERS.X} symbol="X"
                            isActive={activePlayer === 'X'}
                            onChangeName={handlePlayerNameChange}
                    />
                    <Player initialName={INITIAL_PLAYERS.O} symbol="O"
                            isActive={activePlayer === 'O'}
                            onChangeName={handlePlayerNameChange}
                    />
                  </ol>
                  {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestartMatch}/>}
                  <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare} />
              </div>
              <Log turns={gameTurns} />
          </main>
        </Fragment>
    );
}

export default App;
