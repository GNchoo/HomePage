// rain.jsx

import React, { useEffect, useRef } from "react";

const Rain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // canvas 요소에 position 속성 설정
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";

    // canvas 요소의 z-index 설정 (다른 요소보다 위에 표시될 수 있도록)
    canvas.style.zIndex = "-1";
    // 캔버스 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 랜덤한 비 구현을 위한 비 객체 생성
    const raindrops = [];
    const numRaindrops = 100;

    for (let i = 0; i < numRaindrops; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 2,
      });
    }

    // 비 위치를 업데이트하고 캔버스에 그리는 함수
    const updateRaindrops = () => {
      // 캔버스 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 각각의 비 그리기
      raindrops.forEach((raindrop) => {
        // 비를 아래로 이동
        raindrop.y += raindrop.speed;

        // 비가 화면을 벗어나면 위치 초기화
        if (raindrop.y > canvas.height) {
          raindrop.x = Math.random() * canvas.width;
          raindrop.y = 0;
        }

        // 비 그리기
        ctx.beginPath();
        ctx.moveTo(raindrop.x, raindrop.y);
        ctx.lineTo(raindrop.x, raindrop.y + raindrop.length);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // 초당 60 프레임으로 비 업데이트
      requestAnimationFrame(updateRaindrops);
    };

    // 비 업데이트 시작
    updateRaindrops();

    // 컴포넌트 언마운트 시 캔버스 정리
    return () => cancelAnimationFrame(updateRaindrops);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Rain;
