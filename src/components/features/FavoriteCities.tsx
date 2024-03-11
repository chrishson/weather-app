"use client";

import {
  FavoriteCity,
  useFavoriteCitiesStore,
} from "@/stores/favoriteCitiesStore";
import { useEffect } from "react";
import FavoriteCityCard from "../shared/FavoriteCityCard";

export default function FavoriteCities() {
  const { favoriteCities, favoriteCitiesWeather, setFavoriteCitiesWeather } =
    useFavoriteCitiesStore();

  const fetchData = async () => {
    const favoriteCityWeatherPromises = favoriteCities.map(
      (favoriteCity: FavoriteCity) => {
        return fetch(
          // Get data for current weather only.
          `/api/weather/search?lat=${favoriteCity.lat}&lon=${favoriteCity.lon}&type=current`
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
    // TODO Have a 0/5 Favorite Cities header to show max.
    <div className="flex flex-wrap justify-center gap-4">
      {favoriteCitiesWeather &&
        favoriteCitiesWeather.map((city, index) => {
          return <FavoriteCityCard city={city} key={city.cityName + index} />;
        })}
    </div>
  );
}
