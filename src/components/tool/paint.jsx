import React, { useState, useEffect } from "react";

const Paint = () => {
  const [mouseDown, setMouseDown] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState("#000000"); // 그려지는 기본색깔 설정
  const [filling, setFilling] = useState(false); // 색상 채우기 여부 설정
  const [erasing, setErasing] = useState(false); // 지우개 모드 설정

  // 그림판 초기화
  const initializeCanvas = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "white"; // 배경은 흰색
    context.fillRect(0, 0, canvas.width, canvas.height);

    setCanvas(canvas);
    setContext(context);
  };

  // 마우스를 누르거나 뗄 때 그림 그리기
  const handleDrawing = (e) => {
    if (!mouseDown) return;

    const { offsetX, offsetY } = e.nativeEvent;
    if (filling) {
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else if (erasing) {
      context.clearRect(offsetX - 5, offsetY - 5, 10, 10);
    } else {
      context.lineTo(offsetX, offsetY);
      context.strokeStyle = color;
      context.stroke();
    }
  };

  // 마우스를 누를 때 그리기 시작
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setMouseDown(true);
  };

  // 마우스를 뗄 때 그리기 종료
  const stopDrawing = () => {
    context.closePath();
    setMouseDown(false);
  };

  // 그려지는 색깔 변경
  const changeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    setErasing(false);
  };

  // 지우개 모드 설정
  const toggleErasing = () => {
    setErasing(!erasing);
    setFilling(false);
  };

  // 컴포넌트가 마운트될 때 그림판 초기화
  useEffect(() => {
    initializeCanvas();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <input type="color" value={color} onChange={changeColor} />
      <button onClick={toggleErasing}>{erasing ? "그리기 모드" : "지우개 모드"}</button>
      <canvas
        id="canvas"
        style={{ background: "white" }}
        width={1000}
        height={700}
        onMouseDown={startDrawing}
        onMouseMove={handleDrawing}
        onMouseUp={stopDrawing}
      />
    </div>
  );
};

export default Paint;
