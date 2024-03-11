"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";

export default function FocusedWeather() {
  const { weatherData } = useFocusedWeatherState();
  const { addFavoriteCity } = useFavoriteCitiesStore();

  const handleClick = () => {
    addFavoriteCity(
      weatherData.cityName,
      weatherData.countryShortName,
      weatherData.lat,
      weatherData.lon
    );
  };

  return (
    <div>
      <button onClick={handleClick}>ADD TO FAVORITES</button>
      {weatherData?.daily.map((day: any) => {
        return (
          <div key={day.dt}>
            <div>{new Date(day.dt * 1000).toDateString()}</div>
            <div>{day.weather[0].description}</div>
            <div>{day.weather[0].main}</div>
          </div>
        );
      })}
    </div>
  );
}
