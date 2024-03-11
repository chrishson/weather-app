import { create } from "zustand";
import { CityWeather } from "./favoriteCitiesStore";

type FocusedWeatherState = {
  cityWeather: CityWeather | null;
  setCityWeatherData: (data: CityWeather) => void;
};

export const useFocusedWeatherState = create<FocusedWeatherState>()((set) => ({
  cityWeather: null,

  setCityWeatherData: (data) =>
    set((state) => ({
      ...state,
      cityWeather: data,
    })),
}));
