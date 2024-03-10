import { create } from "zustand";

type FocusedWeatherState = {
  // TODO: Add Typing for Open Weather API Response
  weatherData: any;
  setWeatherData: (data: any) => void;
};

export const useFocusedWeatherState = create<FocusedWeatherState>()((set) => ({
  weatherData: null,

  setWeatherData: (data) =>
    set((state) => ({
      ...state,
      weatherData: data,
    })),
}));
