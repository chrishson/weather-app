import { DailyWeather } from "@/stores/types";
import WeatherIcon from "../ui/WeatherIcon";
import { roundTemperature } from "@/lib/utils";

type WeekdayCardProps = {
  dailyWeather: DailyWeather;
  weekday: string;
};

export default function WeekdayCard({
  dailyWeather,
  weekday,
}: WeekdayCardProps) {
  return (
    <div
      key={dailyWeather.dt}
      className="p-4 border border-gray-200 rounded-md shadow-sm w-32"
    >
      <p className="text-center font-bold text-lg">{weekday}</p>
      <p className="text-sm text-center h-8">
        {dailyWeather.weather[0].description}
      </p>
      <WeatherIcon
        weatherCode={dailyWeather.weather[0].id}
        className="flex justify-center h-24 w-24"
      />
      <div className="flex justify-between text-md">
        <p> L: {roundTemperature(dailyWeather.temp.min)}°</p>
        <p> H: {roundTemperature(dailyWeather.temp.max)}°</p>
      </div>
    </div>
  );
}
