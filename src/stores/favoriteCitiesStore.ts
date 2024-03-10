import { create } from "zustand";
import { persist } from "zustand/middleware";

// TODO: Put Limit on Favorite Cities
// TODO: Prevent Duplicates. Prevent Click if Already Favorite.

enum CityIds {
  LONDON = 2643743,
  SEOUL = 1835848,
  VANCOUVER = 6173331,
}

type FavoriteCitiesState = {
  favoriteCitiesIds: number[];
  // TODO: do we want this to be a map?
  favoriteCityWeatherData: any[];
  addFavoriteCityId: (cityId: number) => void;
  removeFavoriteCityId: (cityId: number) => void;
  setFavoriteCitiesWeatherData: (weatherData: any) => void;
};

// Initial Cities in Favorites List if user hasn't added/removed any.
const initialState = {
  favoriteCitiesIds: [CityIds.LONDON, CityIds.SEOUL, CityIds.VANCOUVER],
  favoriteCityWeatherData: [],
};

// Persisting Favorite Cities Ids in Local Storage
export const useFavoriteCitiesStore = create<FavoriteCitiesState>()(
  persist(
    (set) => ({
      ...initialState,
      addFavoriteCityId: (cityId) =>
        set((state) => ({
          favoriteCitiesIds: [...state.favoriteCitiesIds, cityId],
        })),
      removeFavoriteCityId: (cityId) =>
        set((state) => ({
          favoriteCitiesIds: state.favoriteCitiesIds.filter(
            (id) => id !== cityId
          ),
        })),
      setFavoriteCitiesWeatherData: (weatherData: any) => {
        set(() => ({
          favoriteCityWeatherData: weatherData,
        }));
      },
    }),
    {
      name: "favorite-city-ids",
      getStorage: () => localStorage,
      // Only store favorite city ids in local storage
      partialize: (state) => ({ favoriteCitiesIds: state.favoriteCitiesIds }),
    }
  )
);
