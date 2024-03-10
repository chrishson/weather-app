"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useEffect } from "react";

export default function FavoriteCities() {
  const {
    favoriteCitiesIds,
    favoriteCityWeatherData,
    removeFavoriteCityId,
    setFavoriteCitiesWeatherData,
  } = useFavoriteCitiesStore();

  // TODO: Extract into Util function
  const fetchAllWeatherData = async () => {
    const response = await fetch(
      `/api/weather/favorites?city_codes=${favoriteCitiesIds}`
    );

    const data = await response.json();

    setFavoriteCitiesWeatherData(data.list);
  };

  useEffect(() => {
    if (favoriteCitiesIds.length > 0) {
      fetchAllWeatherData();
    } else {
      setFavoriteCitiesWeatherData([]);
    }
  }, [favoriteCitiesIds]);

  return (
    <div>
      {favoriteCityWeatherData &&
        favoriteCityWeatherData.map((weatherData) => {
          return (
            <div key={weatherData.id}>
              <p>City: {weatherData.name}</p>
              <p>Temp: {weatherData.main.temp}</p>
              <p>Description: {weatherData.weather[0].description}</p>
              {/* TODO: Icon component? */}
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              <button onClick={() => removeFavoriteCityId(weatherData.id)}>
                Remove From Favorites
              </button>
            </div>
          );
        })}
    </div>
  );
}
