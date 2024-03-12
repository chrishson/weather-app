import { CurrentWeather } from "@/stores/types";
import WeatherIcon from "../ui/WeatherIcon";
import { roundTemperature } from "@/lib/utils";

type CurrentForecastProps = {
  currentForecast: CurrentWeather;
};

export default function CurrentForecast({
  currentForecast,
}: CurrentForecastProps) {
  if (!currentForecast) return null;
  console.log(currentForecast, "currentForecast");
  return (
    <div className="flex justify-center items-center pb-2">
      <WeatherIcon
        weatherCode={currentForecast.weather[0].id}
        className="h-64 w-64 sm:h-80 sm:w-80"
      />
      <div className="text-right text-2xl">
        <p>{roundTemperature(currentForecast.temp)}°C</p>
        <p>Feels like {roundTemperature(currentForecast.feels_like)}°C</p>
        <p>{currentForecast.weather[0].description}</p>
      </div>
    </div>
  );
}
