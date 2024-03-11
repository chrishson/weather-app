"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useEffect } from "react";

export default function FavoriteCities() {
  const {
    favoriteCities,
    favoriteCitiesWeather,
    removeFavoriteCity,
    setFavoriteCitiesWeather: addFavoriteCityWeather,
  } = useFavoriteCitiesStore();

  const fetchData = async () => {
    // TODO: Fix Types
    const favoriteCityWeatherPromises = favoriteCities.map((city: any) => {
      return fetch(
        // Get data for current weather only.
        `/api/weather/search?lat=${city.lat}&lon=${city.lon}&type=current`
      ).then((res) => res.json());
    });

    const results = await Promise.all(favoriteCityWeatherPromises);
    const favoriteCitiesWeatherState = results.map((result, index) => {
      return {
        ...result,
        cityName: favoriteCities[index].cityName,
        countryShortName: favoriteCities[index].countryShortName,
      };
    });

    addFavoriteCityWeather(favoriteCitiesWeatherState);
  };

  useEffect(() => {
    fetchData();
  }, [favoriteCities]);

  return (
    <div>
      {favoriteCitiesWeather &&
        favoriteCitiesWeather.map((city, index) => {
          return (
            <div key={city.cityName + index}>
              <p>City Name: {city.cityName}</p>
              <p>Country: {city.countryShortName}</p>
              <p>Description: {city.current.weather[0].description}</p>
              <p>Temp: {city.current.temp}</p>
              <button
                onClick={() =>
                  removeFavoriteCity(city.cityName, city.countryShortName)
                }
              >
                Remove
              </button>
            </div>
          );
        })}
    </div>
  );
}
