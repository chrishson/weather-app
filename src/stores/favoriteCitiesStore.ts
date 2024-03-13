import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CityWeather, FavoriteCity } from "./types";
import { getCityCountryCode } from "@/lib/utils";

export const DEFAULT_FAVORITE_CITIES = [
  {
    cityName: "Vancouver",
    countryShortName: "CA",
    lat: 49.2827,
    lon: -123.1207,
  },
  {
    cityName: "London",
    countryShortName: "GB",
    lat: 51.5072,
    lon: -0.1276,
  },
  {
    cityName: "Seoul",
    countryShortName: "KR",
    lat: 37.5518911,
    lon: 126.9917937,
  },
];

type FavoriteCitiesState = {
  favoriteCities: FavoriteCity[];
  favoriteCitiesWeather: CityWeather[];
  isLoading: boolean;
  addFavoriteCity: (
    cityName: string,
    countryShortName: string,
    lat: number,
    lon: number
  ) => void;
  removeFavoriteCity: (cityName: string, countryShortName: string) => void;
  setFavoriteCitiesWeather: (weatherData: CityWeather[]) => void;
  setLoadingState: (state: boolean) => void;
};

// Initial Cities in Favorites List if user hasn't added/removed any.
const initialState: {
  favoriteCities: FavoriteCity[];
  favoriteCitiesWeather: CityWeather[];
  isLoading: boolean;
} = {
  favoriteCities: DEFAULT_FAVORITE_CITIES,
  favoriteCitiesWeather: [],
  isLoading: true,
};

// Persisting Favorite Cities in Local Storage
export const useFavoriteCitiesStore = create<FavoriteCitiesState>()(
  persist(
    (set) => ({
      ...initialState,
      addFavoriteCity: (
        cityName: string,
        countryShortName: string,
        lat: number,
        lon: number
      ) => {
        set((state) => {
          // Prevent duplicate city/country from being added.
          if (
            !state.favoriteCities.some(
              (favoriteCity: FavoriteCity) =>
                favoriteCity.cityName === cityName &&
                favoriteCity.countryShortName === countryShortName
            ) &&
            state.favoriteCities.length <= 4
          ) {
            return {
              favoriteCities: [
                ...state.favoriteCities,
                { cityName, countryShortName, lat, lon },
              ],
            };
          }
          return state;
        });
      },
      removeFavoriteCity: (cityName: string, countryShortName: string) => {
        set((state) => ({
          favoriteCities: state.favoriteCities.filter(
            (city) =>
              getCityCountryCode(city.cityName, city.countryShortName) !==
              getCityCountryCode(cityName, countryShortName)
          ),
        }));
      },
      setFavoriteCitiesWeather: (cityWeather: CityWeather[]) => {
        set(() => {
          return {
            favoriteCitiesWeather: cityWeather,
          };
        });
      },
      setLoadingState: (state) => set(() => ({ isLoading: state })),
    }),
    {
      name: "favorite-city-ids",
      getStorage: () => localStorage,
      partialize: (state) => ({ favoriteCities: state.favoriteCities }),
    }
  )
);
