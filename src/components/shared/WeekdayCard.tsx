import { DailyWeather } from "@/stores/types";
import WeatherIcon from "../ui/WeatherIcon";
import { getTemperatureByUnit } from "@/lib/utils";
import { useTemperatureUnitStore } from "@/stores/temperatureUnitStore";

type WeekdayCardProps = {
  dailyWeather: DailyWeather;
  weekday: string;
};

export default function WeekdayCard({
  dailyWeather,
  weekday,
}: WeekdayCardProps) {
  const { temperatureUnit } = useTemperatureUnitStore();
  const minTemp = getTemperatureByUnit(dailyWeather.temp.min, temperatureUnit);
  const maxTemp = getTemperatureByUnit(dailyWeather.temp.max, temperatureUnit);
  return (
    <div
      key={dailyWeather.dt}
      className="p-4 border border-gray-200 rounded-md shadow-sm w-32"
    >
      <p className="text-center font-bold text-lg">{weekday}</p>
      <p className="text-center h-8">{dailyWeather.weather[0].description}</p>
      <WeatherIcon
        weatherCode={dailyWeather.weather[0].id}
        className="flex justify-center h-24 w-24 mx-auto"
      />
      <div className="flex justify-between text-md">
        <p> {minTemp}</p>
        <p> {maxTemp}</p>
      </div>
    </div>
  );
}
