import React from "react";

const WeatherBox = ({ weather }) => {
  if (!weather) {
    return null;
  }

  const { name, main, weather: weatherData, wind } = weather;
  const iconCode = weatherData[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  const { temp } = main;
  const weatherDescription = weatherData[0]?.description; // 날씨
  const windSpeed = wind?.speed; // 풍속

  return (
    <div className="weatherBox">
      <div>{name}</div>
      <h2>현재 기온: {temp}°C</h2>
      <h3>
        <img src={iconUrl} alt="Weather Icon" />
        {weatherDescription}
      </h3>
      <p>풍속 : {windSpeed} m/s</p>
    </div>
  );
};

export default WeatherBox;
