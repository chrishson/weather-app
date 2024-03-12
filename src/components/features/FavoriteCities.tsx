"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useEffect } from "react";
import FavoriteCityCard from "../shared/FavoriteCityCard";
import { FavoriteCity } from "@/stores/types";

export default function FavoriteCities() {
  const { favoriteCities, favoriteCitiesWeather, setFavoriteCitiesWeather } =
    useFavoriteCitiesStore();

  const fetchData = async () => {
    const favoriteCityWeatherPromises = favoriteCities.map(
      (favoriteCity: FavoriteCity) => {
        return fetch(
          // Get data for current weather only.
          `/api/weather/search?lat=${favoriteCity.lat}&lon=${favoriteCity.lon}`
        ).then((res) => res.json());
      }
    );

    const results = await Promise.all(favoriteCityWeatherPromises);

    const favoriteCitiesWeatherState = results.map((result, index) => {
      return {
        ...result,
        cityName: favoriteCities[index].cityName,
        countryShortName: favoriteCities[index].countryShortName,
      };
    });

    setFavoriteCitiesWeather(favoriteCitiesWeatherState);
  };

  useEffect(() => {
    fetchData();
  }, [favoriteCities]);

  return (
    // TODO: Have a 0/5 Favorite Cities header to show max.
    // TODO: Have a Loading / No Favorite Cities Placeholder
    <div className="flex flex-col flex-wrap gap-3">
      {favoriteCitiesWeather &&
        favoriteCitiesWeather.map((cityWeather, index) => {
          return (
            <FavoriteCityCard
              cityWeather={cityWeather}
              key={cityWeather.cityName + index}
            />
          );
        })}
    </div>
  );
}
