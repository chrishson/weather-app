"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useEffect } from "react";
import FavoriteCityCard from "../shared/FavoriteCityCard";
import { fetchFavoriteCitiesWeather } from "@/lib/utils";

export default function FavoriteCities() {
  const { favoriteCities, favoriteCitiesWeather, setFavoriteCitiesWeather } =
    useFavoriteCitiesStore();

  const fetchAndSetFavoriteCitiesWeather = async () => {
    const favoriteCitiesWeatherState = await fetchFavoriteCitiesWeather(
      favoriteCities
    );
    setFavoriteCitiesWeather(favoriteCitiesWeatherState);
  };

  useEffect(() => {
    fetchAndSetFavoriteCitiesWeather();
  }, [favoriteCities]);

  return (
    // TODO: Have a Loading / No Favorite Cities Placeholder
    <div className="flex flex-col flex-wrap gap-3">
      {favoriteCitiesWeather.length > 0 ? (
        favoriteCitiesWeather.map((cityWeather, index) => {
          return (
            <FavoriteCityCard
              cityWeather={cityWeather}
              key={cityWeather.cityName + index}
            />
          );
        })
      ) : (
        <div className="flex justify-center items-center min-w-[280px] h-full text-3xl">
          No Favorite Cities
        </div>
      )}
    </div>
  );
}
