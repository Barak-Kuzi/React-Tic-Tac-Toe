import React, {MouseEventHandler} from "react";

interface GameOverProps {
    winner: string | null,
    onRestart: MouseEventHandler<HTMLButtonElement>
}
export default function GameOver({winner, onRestart}: GameOverProps): React.JSX.Element {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} Won!</p>}
            {!winner && <p>It's a draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    );
}