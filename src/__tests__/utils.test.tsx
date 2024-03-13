import {
  fetchCityWeather,
  getCityCountryCode,
  getTemperatureByUnit,
  roundTemperature,
} from "@/lib/utils";

describe("roundTemperature", () => {
  it("should round the temperature to the nearest whole number", () => {
    expect(roundTemperature(25.6)).toEqual(26);
    expect(roundTemperature(30.2)).toEqual(30);
    expect(roundTemperature(18.9)).toEqual(19);
  });
});

describe("getTemperatureByUnit", () => {
  it("should return temperature in Celsius when unit is 'metric'", () => {
    expect(getTemperatureByUnit(25.6, "metric")).toEqual("26°C");
    expect(getTemperatureByUnit(30.2, "metric")).toEqual("30°C");
    expect(getTemperatureByUnit(18.9, "metric")).toEqual("19°C");
  });

  it("should return temperature in Fahrenheit when unit is not 'metric'", () => {
    expect(getTemperatureByUnit(25.6, "imperial")).toEqual("78°F");
    expect(getTemperatureByUnit(30.2, "imperial")).toEqual("86°F");
    expect(getTemperatureByUnit(18.9, "imperial")).toEqual("66°F");
  });
});

describe("getCityCountryCode", () => {
  it("should return the city and country code separated by a hyphen", () => {
    expect(getCityCountryCode("London", "UK")).toEqual("London-UK");
    expect(getCityCountryCode("Paris", "FR")).toEqual("Paris-FR");
    expect(getCityCountryCode("New York", "US")).toEqual("New York-US");
  });
});

describe("fetchCityWeather", () => {
  it("should fetch city weather data based on latitude and longitude", async () => {
    const lat = 51.5074;
    const lng = -0.1278;
    const expectedData = { temperature: 20, weather: "Sunny" };

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(expectedData),
    });

    const result = await fetchCityWeather(lat, lng);

    expect(fetch).toHaveBeenCalledWith(
      `/api/weather/search?lat=${lat}&lon=${lng}`
    );
    expect(result).toEqual(expectedData);
  });
});
