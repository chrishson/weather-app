"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useEffect } from "react";
import FavoriteCityCard from "../shared/FavoriteCityCard";

export default function FavoriteCities() {
  const { favoriteCities, favoriteCitiesWeather, setFavoriteCitiesWeather } =
    useFavoriteCitiesStore();

  const fetchData = async () => {
    // TODO: Fix Types
    // const favoriteCityWeatherPromises = favoriteCities.map((city: any) => {
    //   return fetch(
    //     // Get data for current weather only.
    //     `/api/weather/search?lat=${city.lat}&lon=${city.lon}&type=current`
    //   ).then((res) => res.json());
    // });

    // const results = await Promise.all(favoriteCityWeatherPromises);
    // TODO: Renable real data fetching
    const results = [
      {
        lat: 49.2827,
        lon: -123.1207,
        timezone: "America/Vancouver",
        timezone_offset: -25200,
        current: {
          dt: 1710189273,
          sunrise: 1710167590,
          sunset: 1710209500,
          temp: 6.26,
          feels_like: 2.24,
          pressure: 1005,
          humidity: 89,
          dew_point: 4.58,
          uvi: 0.7,
          clouds: 100,
          visibility: 9656,
          wind_speed: 6.69,
          wind_deg: 90,
          wind_gust: 9.77,
          weather: [
            {
              id: 502,
              main: "Rain",
              description: "heavy intensity rain",
              icon: "10d",
            },
            {
              id: 701,
              main: "Mist",
              description: "mist",
              icon: "50d",
            },
          ],
          rain: {
            "1h": 4.21,
          },
        },
      },
      {
        lat: 37.5519,
        lon: 126.9918,
        timezone: "Asia/Seoul",
        timezone_offset: 32400,
        current: {
          dt: 1710189273,
          sunrise: 1710193668,
          sunset: 1710236157,
          temp: 1.45,
          feels_like: 1.45,
          pressure: 1014,
          humidity: 87,
          dew_point: -0.42,
          uvi: 0,
          clouds: 75,
          visibility: 7000,
          wind_speed: 1.03,
          wind_deg: 310,
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04n",
            },
          ],
        },
      },
      {
        lat: 42.9849,
        lon: -81.2453,
        timezone: "America/Nipigon",
        timezone_offset: -14400,
        current: {
          dt: 1710189273,
          sunrise: 1710157397,
          sunset: 1710199596,
          temp: 9.06,
          feels_like: 6.79,
          pressure: 1008,
          humidity: 46,
          dew_point: -1.71,
          uvi: 0.97,
          clouds: 20,
          visibility: 10000,
          wind_speed: 4.12,
          wind_deg: 240,
          wind_gust: 8.23,
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d",
            },
          ],
        },
      },
    ];
    const favoriteCitiesWeatherState = results.map((result, index) => {
      return {
        ...result,
        cityName: favoriteCities[index].cityName,
        countryShortName: favoriteCities[index].countryShortName,
      };
    });

    setFavoriteCitiesWeather(favoriteCitiesWeatherState);
  };

  useEffect(() => {
    fetchData();
  }, [favoriteCities]);

  return (
    // TODO Have a 0/5 Favorite Cities header to show max.
    <div className="flex flex-wrap justify-center gap-4">
      {favoriteCitiesWeather &&
        favoriteCitiesWeather.map((city, index) => {
          return <FavoriteCityCard city={city} key={city.cityName + index} />;
        })}
    </div>
  );
}
