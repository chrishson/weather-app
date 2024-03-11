import { create } from "zustand";
import { persist } from "zustand/middleware";

// TODO: Put Limit on Favorite Cities

export type Weather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};

export type CityWeather = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: Weather;
  daily?: Weather[];
  cityName: string;
  countryShortName: string;
};

export type FavoriteCity = {
  cityName: string;
  countryShortName: string;
  lat: number;
  lon: number;
};

type FavoriteCitiesState = {
  favoriteCities: FavoriteCity[];
  favoriteCitiesWeather: CityWeather[];
  addFavoriteCity: (
    cityName: string,
    countryShortName: string,
    lat: number,
    lon: number
  ) => void;
  removeFavoriteCity: (cityName: string, countryShortName: string) => void;
  setFavoriteCitiesWeather: (weatherData: CityWeather[]) => void;
};

// Initial Cities in Favorites List if user hasn't added/removed any.
const initialState: {
  favoriteCities: FavoriteCity[];
  favoriteCitiesWeather: CityWeather[];
} = {
  favoriteCities: [
    {
      cityName: "Seoul",
      countryShortName: "KR",
      lat: 37.5518911,
      lon: 126.9917937,
    },
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
  ],
  favoriteCitiesWeather: [],
};

// TODO: Extract Util function to get unique city/country code.
const getCityCountryCode = (cityName: string, countryShortName: string) => {
  return `${cityName}-${countryShortName}`;
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
            )
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
    }),
    {
      name: "favorite-city-ids",
      getStorage: () => localStorage,
      // Only store Favorite Cities in Local Storage
      partialize: (state) => ({ favoriteCities: state.favoriteCities }),
    }
  )
);
