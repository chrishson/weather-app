import { Weather } from "@/stores/types";
import WeatherIcon from "../core/WeatherIcon";

type WeekdayCardProps = {
  dailyWeather: Weather;
  weekday: string;
};

export default function WeekdayCard({
  dailyWeather,
  weekday,
}: WeekdayCardProps) {
  return (
    <div
      key={dailyWeather.dt}
      className="p-4 border border-gray-200 rounded-md shadow-sm"
    >
      <div className="font-bold text-lg">{weekday}</div>
      <WeatherIcon
        weatherCode={dailyWeather.weather[0].id}
        className="h-20 w-20"
      />
      <div className="text-gray-500">{dailyWeather.weather[0].description}</div>
    </div>
  );
}
