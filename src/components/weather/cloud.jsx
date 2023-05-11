import React, { useEffect, useRef } from "react";
import cloud from "../../assets/cloud.png";

const Cloud = () => {
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

    // 어두운 구름 이미지 생성
    const cloudImage = new Image();
    cloudImage.src = cloud;

    // 구름 초기 위치
    let cloudX = -cloudImage.width; // 왼쪽 화면 밖에서 시작
    const cloudY = 100; // 필요에 따라 Y 위치 조정

    // 구름 이동 및 그리기
    const moveCloud = () => {
      // 캔버스 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 구름 이미지 그리기
      ctx.drawImage(cloudImage, cloudX, cloudY);

      // 구름을 오른쪽으로 이동
      cloudX += 1; // 필요에 따라 속도 조정

      // 구름이 화면을 벗어나면 초기 위치로 재설정
      if (cloudX > canvas.width) {
        cloudX = -cloudImage.width;
      }

      // 초당 60 프레임으로 구름 이동
      requestAnimationFrame(moveCloud);
    };

    // 구름 이동 시작
    moveCloud();

    // 컴포넌트 언마운트 시 캔버스 정리
    return () => cancelAnimationFrame(moveCloud);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Cloud;
