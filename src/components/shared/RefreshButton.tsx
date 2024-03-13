"use client";

import { fetchCityWeather, fetchFavoriteCitiesWeather } from "@/lib/utils";
import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { SlRefresh } from "react-icons/sl";
import { Button } from "../ui/button";

export default function RefreshButton() {
  const { cityWeather, setCityWeatherData } = useFocusedWeatherState();
  const { favoriteCities, setFavoriteCitiesWeather, setLoadingState } =
    useFavoriteCitiesStore();

  const fetchAndSetCityWeather = async () => {
    if (!cityWeather) return;
    const data = await fetchCityWeather(cityWeather.lat, cityWeather.lon);
    setCityWeatherData({
      ...data,
      cityName: cityWeather.cityName,
      countryShortName: cityWeather.countryShortName,
    });
  };

  const fetchAndSetFavoriteCitiesWeather = async () => {
    setLoadingState(true);
    const favoriteCitiesWeatherState = await fetchFavoriteCitiesWeather(
      favoriteCities
    );
    setLoadingState(false);
    setFavoriteCitiesWeather(favoriteCitiesWeatherState);
  };

  const handleRefresh = async () => {
    await fetchAndSetCityWeather();
    await fetchAndSetFavoriteCitiesWeather();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="flex items-center gap-1 p-2 border rounded-md shadow-sm"
      onClick={handleRefresh}
    >
      <SlRefresh />
    </Button>
  );
}
