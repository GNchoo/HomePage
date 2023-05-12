import { useEffect, useState, useCallback } from "react";
import apiKey from "../api/api";
import "../components/weather/weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherBox from "../components/weather/WeatherBox";
import WeatherButton from "../components/weather/WeatherButton";
import WeatherSearch from "../components/weather/WeatherSearch";
import Snow from "../components/weather/snow";
import Rain from "../components/weather/rain";
import Cloud from "../components/weather/cloud";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["Seoul", "Busan", "New York", "Tokyo"];
  const [loading, setLoading] = useState(true);
  const [cityNotFound, setCityNotFound] = useState(false);

  const getWeatherByCurrentLocation = useCallback(async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${apiKey}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }, []);

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, [getWeatherByCurrentLocation]);

  const getWeatherByCity = useCallback(async () => {
    if (city === "") {
      setCityNotFound(true);
      setWeather(null);
      setLoading(false);
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=kr&appid=${apiKey}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod === "404") {
      setCityNotFound(true);
      setWeather(null);
    } else {
      setCityNotFound(false);
      setWeather(data);
    }

    setLoading(false);
  }, [city]);

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);

  return (
    <div className="App">
      {loading ? (
        <div className="container">
          <ClipLoader color="#ffffff" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          {cityNotFound && (
            <div className="city-not-found">
              <p>입력하신 도시는 존재하지 않습니다(영문으로 입력)</p>
              <button
                onClick={() => {
                  setCity("");
                  setCityNotFound(false);
                }}
              >
                메인페이지로 돌아가기
              </button>
            </div>
          )}
          <WeatherSearch city={city} setCity={setCity} getWeatherByCity={getWeatherByCity} />
          <div className="weather-box">
            {weather?.weather[0]?.description.toLowerCase().includes("눈") && <Snow />}
            {weather?.weather[0]?.description.toLowerCase().includes("비") && <Rain />}
            {weather?.weather[0]?.description.toLowerCase().includes("구름") && <Cloud />}
            {weather?.weather[0]?.description.toLowerCase().includes("흐림") && <Cloud />}
            <WeatherBox weather={weather} />
          </div>
          <WeatherButton cities={cities} setCity={setCity} getCurrentLocation={getCurrentLocation} />
        </div>
      )}
    </div>
  );
}

export default App;
