import { create } from "zustand";
import { CityWeather } from "./types";

type FocusedWeatherState = {
  cityWeather: CityWeather | null;
  isLoading: boolean;
  setCityWeatherData: (data: CityWeather) => void;
  setLoadingState: (isLoading: boolean) => void;
};

export const useFocusedWeatherState = create<FocusedWeatherState>()((set) => ({
  cityWeather: null,
  isLoading: false,

  setCityWeatherData: (data) =>
    set((state) => ({
      ...state,
      cityWeather: data,
    })),

  setLoadingState: (state) => set(() => ({ isLoading: state })),
}));
