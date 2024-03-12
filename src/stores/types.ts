// Types used in multiple areas
export type Weather = {
  dt: number;
  sunrise: number;
  sunset: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};

export type CurrentWeather = Weather & {
  temp: number;
};

export type DailyWeather = Weather & {
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
};

export type FavoriteCity = {
  cityName: string;
  countryShortName: string;
  lat: number;
  lon: number;
};

export type CityWeather = FavoriteCity & {
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyWeather[];
};
