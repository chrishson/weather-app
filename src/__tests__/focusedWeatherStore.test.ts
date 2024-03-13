import { useFocusedWeatherState } from "../stores/focusedWeatherStore";
import { MOCK_WEATHER_RESPONSE } from "../__mocks__/mock-weather-response";

describe("focusedWeatherStore", () => {
  test("should set city weather data correctly", () => {
    const { setCityWeatherData } = useFocusedWeatherState.getState();

    setCityWeatherData(MOCK_WEATHER_RESPONSE[0]);

    expect(useFocusedWeatherState.getState().cityWeather).toEqual(
      MOCK_WEATHER_RESPONSE[0]
    );
  });

  test("should set loading state correctly", () => {
    const { setLoadingState } = useFocusedWeatherState.getState();

    setLoadingState(true);

    expect(useFocusedWeatherState.getState().isLoading).toBe(true);

    setLoadingState(false);

    expect(useFocusedWeatherState.getState().isLoading).toBe(false);
  });
});
