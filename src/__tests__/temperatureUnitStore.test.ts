import { useTemperatureUnitStore } from "../stores/temperatureUnitStore";

describe("useTemperatureUnitStore", () => {
  it("should set the temperature unit correctly", () => {
    const { setTemperatureUnit, temperatureUnit } =
      useTemperatureUnitStore.getState();

    expect(temperatureUnit).toBe("metric");

    setTemperatureUnit("imperial");

    const { temperatureUnit: updatedTemperatureUnit } =
      useTemperatureUnitStore.getState();
    expect(updatedTemperatureUnit).toBe("imperial");

    setTemperatureUnit("metric");

    const { temperatureUnit: secondUpdatedTemperatureUnit } =
      useTemperatureUnitStore.getState();

    expect(secondUpdatedTemperatureUnit).toBe("metric");
  });
});
