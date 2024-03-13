import { getWeekday } from "@/lib/utils";
import { DailyWeather } from "@/stores/types";
import WeekdayCard from "../shared/WeekdayCard";

type WeekForecastProps = {
  weekForecastData: DailyWeather[];
  timezone: string;
};

export default function WeekForecast({
  weekForecastData,
  timezone,
}: WeekForecastProps) {
  // I wanted to show 7 days forecast, but the API only gives 8 days forecast.
  const weekForecast = weekForecastData.slice(0, 7) || [];
  
  return (
    <div className="flex flex-wrap pb-4 gap-2 justify-center">
      {weekForecast.map((dailyWeather: DailyWeather, index) => {
        const weekday =
          index === 0 ? "Today" : getWeekday(dailyWeather.dt * 1000, timezone);
        return (
          <WeekdayCard
            dailyWeather={dailyWeather}
            weekday={weekday}
            key={weekday + index}
          />
        );
      })}
    </div>
  );
}
