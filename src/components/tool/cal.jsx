import React, { useState } from "react";
import "../tool/cal.css";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [operCheck, setOperCheck] = useState(true);
  const [pointCheck, setPointCheck] = useState(true);

  const getNum = (e) => {
    setCalc((prev) => prev + e.target.value);
    setOperCheck(true);
  };

  const getOper = (e) => {
    if (operCheck) {
      setCalc((prev) => prev + e.target.value);
      setOperCheck(false);
    }
  };

  const getPoint = (e) => {
    if (calc.length === 0) {
      return;
    }
    if (pointCheck) {
      setCalc((prev) => prev + e.target.value);
      setPointCheck(false);
    }
  };

  const getResult = () => {
    let replace_str = calc.replace(/×/gi, "*").replace(/÷/gi, "/");

    if (isNaN(eval(replace_str))) {
      setCalc("");
    } else if (eval(replace_str) == Infinity) {
      alert("숫자를 0으로 나눌 수는 없습니다.");
      setCalc("");
      return false;
    } else {
      setCalc((prev) => eval(replace_str));
    }
  };

  const delCalc = () => {
    setPointCheck(true);
    setOperCheck(true);
    let str = String(calc).slice(0, -1);
    setCalc((prev) => str);
  };

  const allClear = () => {
    setPointCheck(true);
    setCalc((prev) => "");
  };

  return (
    <div className="MainContainer">
      <input readOnly className="InputBar" value={calc} />
      <div className="ButtonContainer">
        <button className="Button" onClick={allClear}>
          AC
        </button>
        <button className="Button" onClick={delCalc}>
          DEL
        </button>
        <button className="Button" value="%" onClick={getOper}>
          %
        </button>
        <button className="Button" value="÷" onClick={getOper}>
          ÷
        </button>
        <button className="Button" value={7} onClick={getNum}>
          7
        </button>
        <button className="Button" value={8} onClick={getNum}>
          8
        </button>
        <button className="Button" value={9} onClick={getNum}>
          9
        </button>
        <button className="Button" value="×" onClick={getOper}>
          ×
        </button>
        <button className="Button" value={4} onClick={getNum}>
          4
        </button>
        <button className="Button" value={5} onClick={getNum}>
          5
        </button>
        <button className="Button" value={6} onClick={getNum}>
          6
        </button>
        <button className="Button" value="-" onClick={getOper}>
          -
        </button>
        <button className="Button" value={1} onClick={getNum}>
          1
        </button>
        <button className="Button" value={2} onClick={getNum}>
          2
        </button>
        <button className="Button" value={3} onClick={getNum}>
          3
        </button>
        <button className="Button" value="+" onClick={getOper}>
          +
        </button>
        <button className="Button ZeroButton" value={0} onClick={getNum}>
          0
        </button>
        <button className="Button" value="." onClick={getPoint}>
          .
        </button>
        <button className="Button CalButton" onClick={getResult}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;