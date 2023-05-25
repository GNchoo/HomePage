import React, { useState, useEffect } from "react";
import background from "../../assets/switch.webp";
import "./worm.css";

function WormGame() {
  const [worm, setWorm] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [intervalDelay, setIntervalDelay] = useState(200); // 초기 속도(delay)

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
        // 새로운 음식 위치 생성
        const newFood = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        };
        setFood(newFood);
        setScore((prevScore) => prevScore + 10); // 10점 추가
        setIntervalDelay((prevDelay) => Math.max(50, prevDelay - 10)); // 간격(delay) 감소 (빨라짐)
      } else {
        newWorm.pop();
      }

      setWorm(newWorm);
    };

    const gameInterval = setInterval(handleGameTick, intervalDelay); // 업데이트된 간격(delay) 사용

    return () => {
      clearInterval(gameInterval);
    };
  }, [worm, direction, food, gameOver, intervalDelay]);

  const handleRestart = () => {
    setWorm([{ x: 10, y: 10 }]);
    setDirection("right");
    setFood({ x: 0, y: 0 });
    setGameOver(false);
    setIntervalDelay(200); // 속도(delay) 초기화
    setScore(0);
  };

  return (
    <div className="worm-container">
      <div>
        {gameOver ? (
          <div className="game-over">
            <h2>게임 오버</h2>
            <h3>종합 스코어 : {score}</h3> {/* 최종 스코어 표시 */}
            <button onClick={handleRestart}>재시작</button>
          </div>
        ) : (
          <div>
            <div className="game-board">
              {worm.map((segment, index) => (
                <div
                  key={index}
                  className="worm-segment"
                  style={{
                    gridColumnStart: segment.x + 1,
                    gridRowStart: segment.y + 1,
                  }}
                />
              ))}
              <div
                className="food"
                style={{
                  gridColumnStart: food.x + 1,
                  gridRowStart: food.y + 1,
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
