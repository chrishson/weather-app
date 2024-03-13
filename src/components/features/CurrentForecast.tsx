import { CurrentWeather } from "@/stores/types";
import WeatherIcon from "../ui/WeatherIcon";
import { getTemperatureByUnit } from "@/lib/utils";
import { useTemperatureUnitStore } from "@/stores/temperatureUnitStore";

type CurrentForecastProps = {
  currentForecast: CurrentWeather;
};

export default function CurrentForecast({
  currentForecast,
}: CurrentForecastProps) {
  if (!currentForecast) return null;
  const { temperatureUnit } = useTemperatureUnitStore();
  const temperature = getTemperatureByUnit(
    currentForecast.temp,
    temperatureUnit
  );
  const feelsLikeTemperature = getTemperatureByUnit(
    currentForecast.feels_like,
    temperatureUnit
  );
  return (
    <div className="flex justify-center items-center pb-4">
      <WeatherIcon
        weatherCode={currentForecast.weather[0].id}
        className="h-48 w-48 sm:h-80 sm:w-80"
      />
      <div className="text-right text-2xl">
        <p>{temperature}</p>
        <p>Feels like {feelsLikeTemperature}</p>
        <p>{currentForecast.weather[0].description}</p>
      </div>
    </div>
  );
}
