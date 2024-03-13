import { create } from "zustand";
import { persist } from "zustand/middleware";

type TemperatureUnit = "metric" | "imperial";

type TemperatureUnitState = {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
};

const DEFAULT_TEMPERATURE_UNIT: TemperatureUnit = "metric";

export const useTemperatureUnitStore = create<TemperatureUnitState>()(
  persist(
    (set) => ({
      temperatureUnit: DEFAULT_TEMPERATURE_UNIT,
      setTemperatureUnit: (unit: TemperatureUnit) => {
        set(() => {
          return {
            temperatureUnit: unit,
          };
        });
      },
    }),
    {
      name: "temperatureUnit",
    }
  )
);
