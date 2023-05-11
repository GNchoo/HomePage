import React, { useState, useEffect } from "react";
import background from "../../assets/switch.webp";

function WormGame() {
  const [worm, setWorm] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && direction !== "down") setDirection("up");
      else if (event.key === "ArrowDown" && direction !== "up") setDirection("down");
      else if (event.key === "ArrowLeft" && direction !== "right") setDirection("left");
      else if (event.key === "ArrowRight" && direction !== "left") setDirection("right");
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const handleGameTick = () => {
      if (gameOver) return;

      const head = { ...worm[0] };

      if (direction === "up") head.y -= 1;
      else if (direction === "down") head.y += 1;
      else if (direction === "left") head.x -= 1;
      else if (direction === "right") head.x += 1;

      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        setGameOver(true);
        return;
      }

      const newWorm = [head, ...worm];

      if (head.x === food.x && head.y === food.y) {
        // Generate new food location
        const newFood = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        };
        setFood(newFood);
      } else {
        newWorm.pop();
      }

      setWorm(newWorm);
    };

    const gameInterval = setInterval(handleGameTick, 200);

    return () => {
      clearInterval(gameInterval);
    };
  }, [worm, direction, food, gameOver]);

  const handleRestart = () => {
    setWorm([{ x: 10, y: 10 }]);
    setDirection("right");
    setFood({ x: 0, y: 0 });
    setGameOver(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
        background: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        {gameOver ? (
          <div>
            <h2>Game Over</h2>
            <button onClick={handleRestart}>Restart</button>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: "500px",
                height: "500px",
                backgroundColor: "lightgray",
                display: "grid",
                gridTemplateColumns: "repeat(20, 1fr)",
                gridTemplateRows: "repeat(20, 1fr)",
              }}
            >
              {worm.map((segment, index) => (
                <div
                  key={index}
                  style={{
                    gridColumnStart: segment.x + 1,
                    gridRowStart: segment.y + 1,
                    backgroundColor: "green",
                  }}
                />
              ))}
              <div
                style={{
                  gridColumnStart: food.x + 1,
                  gridRowStart: food.y + 1,
                  backgroundColor: "red",
                  border: "1px solid black",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WormGame;
