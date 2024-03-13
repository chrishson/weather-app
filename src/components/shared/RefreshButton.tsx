"use client";

import { fetchCityWeather, fetchFavoriteCitiesWeather } from "@/lib/utils";
import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { SlRefresh } from "react-icons/sl";
import { Button } from "../ui/button";

export default function RefreshButton() {
  const {
    cityWeather,
    setCityWeatherData,
    setLoadingState: setFocusedWeatherLoadingState,
  } = useFocusedWeatherState();
  const {
    favoriteCities,
    setFavoriteCitiesWeather,
    setLoadingState: setFavoriteCitiesLoadingState,
  } = useFavoriteCitiesStore();

  const fetchAndSetCityWeather = async () => {
    if (!cityWeather) return;
    setFocusedWeatherLoadingState(true);
    const data = await fetchCityWeather(cityWeather.lat, cityWeather.lon);
    setCityWeatherData({
      ...data,
      cityName: cityWeather.cityName,
      countryShortName: cityWeather.countryShortName,
    });
    setFocusedWeatherLoadingState(false);
  };

  const fetchAndSetFavoriteCitiesWeather = async () => {
    setFavoriteCitiesLoadingState(true);
    const favoriteCitiesWeatherState = await fetchFavoriteCitiesWeather(
      favoriteCities
    );
    setFavoriteCitiesWeather(favoriteCitiesWeatherState);
    setFavoriteCitiesLoadingState(false);
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
      <SlRefresh size={18}/>
    </Button>
  );
}
