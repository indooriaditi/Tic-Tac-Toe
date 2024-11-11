export default function GameOver({winner, onEnd}) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
                {winner && <p>{winner} won!</p>}
                {!winner && <p>Draw</p>}
                <p>
                    <button onClick={onEnd}>Rematch!</button>
                </p>
        </div>
    )
}