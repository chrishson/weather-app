"use client";

import { Weather, useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";

export default function FocusedWeather() {
  const { cityWeather } = useFocusedWeatherState();
  const { addFavoriteCity } = useFavoriteCitiesStore();

  const handleClick = () => {
    if (!cityWeather) return;
    addFavoriteCity(
      cityWeather.cityName,
      cityWeather.countryShortName,
      cityWeather.lat,
      cityWeather.lon
    );
  };

  return (
    <div>
      <button onClick={handleClick}>ADD TO FAVORITES</button>
      {cityWeather?.daily?.map((day: Weather) => {
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
