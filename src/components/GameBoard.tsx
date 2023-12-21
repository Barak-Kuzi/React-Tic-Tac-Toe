import React from "react";

import {PlayerSymbol} from "../App"
interface GameBoardProps {
    onSelectSquare: Function,
    gameBoard: PlayerSymbol[][]
}
export default function GameBoard({gameBoard, onSelectSquare}: GameBoardProps): React.JSX.Element {
    return (
        <ol id="game-board">
            {gameBoard.map((row: PlayerSymbol[], rowIndex: number) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol: PlayerSymbol, colIndex: number) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                                        disabled={playerSymbol !== null}
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}