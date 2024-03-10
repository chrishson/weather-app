"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";

export default function FocusedWeather() {
  const { weatherData } = useFocusedWeatherState();
  const { addFavoriteCityId } = useFavoriteCitiesStore();

  const handleClick = () => {
    addFavoriteCityId(weatherData?.id)
  };
  return (
    <div>
      {weatherData?.name}
      <button onClick={handleClick}>ADD TO FAVORITES</button>
    </div>
  );
}
