import React, { useRef, useEffect } from "react";

const Snow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // ... 눈을 그리는 코드 ...

    // canvas 요소에 position 속성 설정
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";

    // canvas 요소의 z-index 설정 (다른 요소보다 위에 표시될 수 있도록)
    canvas.style.zIndex = "-1";
  });

  const paint = (ctx) => {
    // 캔버스에 눈 그리기
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const numSnowflakes = 100; // 눈송이 개수

    for (let i = 0; i < numSnowflakes; i++) {
      const x = Math.random() * ctx.canvas.width; // 랜덤한 x 좌표
      const y = Math.random() * ctx.canvas.height; // 랜덤한 y 좌표
      const radius = Math.random() * 5 + 1; // 랜덤한 반지름 크기

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "#ffffff"; // 눈송이 색상
      ctx.fill();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      paint(context);
      setTimeout(animate, 500); // 애니메이션 프레임 간격 조정 (50ms로 설정)
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Snow;
