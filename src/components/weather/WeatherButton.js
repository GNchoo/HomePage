import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, getCurrentLocation }) => {
  const cityNames = {
    Seoul: "서울",
    Busan: "부산",
    "New York": "뉴욕",
    Tokyo: "도쿄",
  };

  return (
    <div>
      <Button variant="secondary" onClick={getCurrentLocation}>
        현재 위치
      </Button>
      {cities.map((item, index) => (
        <Button variant="secondary" key={index} onClick={() => setCity(item)}>
          {cityNames[item]}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
