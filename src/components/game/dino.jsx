import React, { useEffect, useRef } from "react";
import dinoImage from "../../assets/dino/dino.png";
import cactus1Image from "../../assets/dino/cactus1.png";
import cactus2Image from "../../assets/dino/cactus2.png";
import cactus3Image from "../../assets/dino/cactus3.png";
import "./dino.css"; // CSS 파일 import

const DinoGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 게임 로직 변수 및 상태
    let boardWidth = 750;
    let boardHeight = 250;

    let dinoWidth = 50;
    let dinoHeight = 50;
    let dinoX = 50;
    let dinoY = boardHeight - dinoHeight;

    let cactusArray = [];

    let cactus1Width = 34;
    let cactus2Width = 69;
    let cactus3Width = 102;

    let cactusHeight = 50;
    let cactusX = 700;
    let cactusY = boardHeight - cactusHeight;

    let velocityX = -8;
    let velocityY = 0;
    let gravity = 0.4;

    let gameOver = false;
    let score = 0;

    const dinoImg = new Image();
    dinoImg.src = dinoImage;

    const cactus1Img = new Image();
    cactus1Img.src = cactus1Image;

    const cactus2Img = new Image();
    cactus2Img.src = cactus2Image;

    const cactus3Img = new Image();
    cactus3Img.src = cactus3Image;

    const update = () => {
      requestAnimationFrame(update);
      if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      velocityY += gravity;
      dinoY = Math.min(dinoY + velocityY, boardHeight - dinoHeight);
      ctx.drawImage(dinoImg, dinoX, dinoY, dinoWidth, dinoHeight);

      for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactusX += velocityX;
        ctx.drawImage(cactus.img, cactusX, cactusY, cactus.width, cactus.height);

        if (
          detectCollision({ x: dinoX, y: dinoY, width: dinoWidth, height: dinoHeight }, { x: cactusX, y: cactusY, width: cactus.width, height: cactus.height })
        ) {
          gameOver = true;
          // dinoImg.src = "./img/dino-dead.png";
          ctx.drawImage(dinoImg, dinoX, dinoY, dinoWidth, dinoHeight);
        }
      }

      ctx.fillStyle = "white";
      ctx.font = "20px courier";
      score++;
      ctx.fillText(score, 10, 20);
    };

    const moveDino = (e) => {
      if (gameOver) {
        return;
      }

      if ((e.code === "Space" || e.code === "ArrowUp") && dinoY === boardHeight - dinoHeight) {
        velocityY = -10;
      } else if (e.code === "ArrowDown" && dinoY === boardHeight - dinoHeight) {
        // 덕트 액션
      }
    };

    const placeCactus = () => {
      if (gameOver) {
        return;
      }

      let cactus = {
        img: null,
        width: null,
        height: cactusHeight,
      };

      let placeCactusChance = Math.random();

      if (placeCactusChance > 0.9) {
        // 10% 확률로 cactus3 생성
        if (!cactusArray.some((c) => c.img === cactus3Img)) {
          cactus.img = cactus3Img;
          cactus.width = cactus3Width;
          cactusArray.push(cactus);
        }
      } else if (placeCactusChance > 0.7) {
        // 30% 확률로 cactus2 생성
        if (!cactusArray.some((c) => c.img === cactus2Img)) {
          cactus.img = cactus2Img;
          cactus.width = cactus2Width;
          cactusArray.push(cactus);
        }
      } else if (placeCactusChance > 0.5) {
        // 50% 확률로 cactus1 생성
        if (!cactusArray.some((c) => c.img === cactus1Img)) {
          cactus.img = cactus1Img;
          cactus.width = cactus1Width;
          cactusArray.push(cactus);
        }
      }

      if (cactusArray.length > 1) {
        cactusArray.shift();
      }

      // 장애물의 초기 위치로 되돌아가는 로직 추가
      if (cactusX + cactus.width < 0) {
        cactusX = boardWidth;
      }
    };

    setInterval(placeCactus, 1000);

    const detectCollision = (a, b) => {
      return (
        a.x < b.x + b.width && // a의 좌상단이 b의 우상단을 지나치지 않음
        a.x + a.width > b.x && // a의 우상단이 b의 좌상단을 지나침
        a.y < b.y + b.height && // a의 좌상단이 b의 좌하단을 지나치지 않음
        a.y + a.height > b.y
      ); // a의 좌하단이 b의 좌상단을 지나침
    };

    // 이벤트 리스너
    const handleKeyDown = (e) => {
      moveDino(e);
    };

    // Canvas 설정
    canvas.height = boardHeight;
    canvas.width = boardWidth;
    window.addEventListener("keydown", handleKeyDown);

    // 이미지 로딩
    const loadImages = async () => {
      await Promise.all([
        new Promise((resolve) => {
          dinoImg.onload = resolve;
        }),
        new Promise((resolve) => {
          cactus1Img.onload = resolve;
        }),
        new Promise((resolve) => {
          cactus2Img.onload = resolve;
        }),
        new Promise((resolve) => {
          cactus3Img.onload = resolve;
        }),
      ]);
      requestAnimationFrame(update);
      setInterval(placeCactus, 1000);
    };

    loadImages();

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="game-container">
      {" "}
      {/* game-container 클래스를 추가하여 게임을 중앙에 배치합니다 */}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DinoGame;
