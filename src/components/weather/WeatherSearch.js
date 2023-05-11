import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const WeatherSearch = ({ city, setCity, getWeatherByCity }) => {
  const [inputCity, setInputCity] = useState("");

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
    getWeatherByCity();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control type="text" placeholder="도시 이름을 입력하세요" value={inputCity} onChange={handleInputChange} />
        <Button variant="secondary" type="submit">
          검색
        </Button>
      </InputGroup>
    </Form>
  );
};

export default WeatherSearch;
