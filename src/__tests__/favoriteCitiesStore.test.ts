import { CityWeather } from "@/stores/types";
import {
  useFavoriteCitiesStore,
  DEFAULT_FAVORITE_CITIES,
} from "../stores/favoriteCitiesStore";
import { MOCK_WEATHER_RESPONSE } from "../__mocks__/mock-weather-response";

describe("useFavoriteCitiesStore", () => {
  beforeEach(() => {
    // Reset the store before each test
    useFavoriteCitiesStore.setState({
      favoriteCities: DEFAULT_FAVORITE_CITIES,
    });
  });

  it("should add a favorite city correctly", () => {
    const store = useFavoriteCitiesStore.getState();

    expect(store.favoriteCities.length).toBe(DEFAULT_FAVORITE_CITIES.length);

    const newCity = {
      cityName: "New York",
      countryShortName: "US",
      lat: 40.7128,
      lon: -74.006,
    };

    store.addFavoriteCity(
      newCity.cityName,
      newCity.countryShortName,
      newCity.lat,
      newCity.lon
    );

    const updatedStore = useFavoriteCitiesStore.getState();

    expect(updatedStore.favoriteCities.length).toBe(
      DEFAULT_FAVORITE_CITIES.length + 1
    );
    expect(updatedStore.favoriteCities).toContainEqual(newCity);
  });

  it("should not add a duplicate favorite city", () => {
    const store = useFavoriteCitiesStore.getState();

    expect(store.favoriteCities.length).toBe(DEFAULT_FAVORITE_CITIES.length);

    const existingCity = DEFAULT_FAVORITE_CITIES[0];

    store.addFavoriteCity(
      existingCity.cityName,
      existingCity.countryShortName,
      existingCity.lat,
      existingCity.lon
    );

    expect(store.favoriteCities.length).toBe(DEFAULT_FAVORITE_CITIES.length);
  });

  it("should remove a favorite city correctly", () => {
    const store = useFavoriteCitiesStore.getState();

    expect(store.favoriteCities.length).toBe(DEFAULT_FAVORITE_CITIES.length);

    const cityToRemove = DEFAULT_FAVORITE_CITIES[0];

    store.removeFavoriteCity(
      cityToRemove.cityName,
      cityToRemove.countryShortName
    );

    const updatedStore = useFavoriteCitiesStore.getState();

    expect(updatedStore.favoriteCities.length).toBe(
      DEFAULT_FAVORITE_CITIES.length - 1
    );
    expect(updatedStore.favoriteCities).not.toContainEqual(cityToRemove);
  });

  it("should set favorite cities weather correctly", () => {
    const store = useFavoriteCitiesStore.getState();

    expect(store.favoriteCitiesWeather.length).toBe(0);

    const cityWeather: CityWeather[] = MOCK_WEATHER_RESPONSE;

    store.setFavoriteCitiesWeather(cityWeather);

    const updatedStore = useFavoriteCitiesStore.getState();

    expect(updatedStore.favoriteCitiesWeather.length).toBe(cityWeather.length);
    expect(updatedStore.favoriteCitiesWeather).toEqual(cityWeather);
  });

  it("should set loading state correctly", () => {
    const store = useFavoriteCitiesStore.getState();

    expect(store.isLoading).toBe(true);

    store.setLoadingState(false);

    const updatedStore = useFavoriteCitiesStore.getState();
    expect(updatedStore.isLoading).toBe(false);
  });
});
