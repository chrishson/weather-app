import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { GoStar } from "react-icons/go";

import { GoStarFill } from "react-icons/go";
import { CityWeather } from "@/stores/types";

type FavoriteButtonProps = {
  cityWeather: CityWeather;
  size?: number;
};

export default function FavoriteButton({
  cityWeather,
  size = 24,
}: FavoriteButtonProps) {
  const { toast } = useToast();
  const { favoriteCitiesWeather, addFavoriteCity, removeFavoriteCity } =
    useFavoriteCitiesStore();

  const isFavorited = favoriteCitiesWeather.some((favoriteCity) => {
    return cityWeather?.cityName === favoriteCity?.cityName;
  });

  const handleAddFavoriteCityClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (!cityWeather) return;
    if (favoriteCitiesWeather.length >= 4) {
      toast({
        title: "Favorites Limit Reached",
        description: "You can only favorite up to 4 cities.",
        variant: "destructive",
      });
      return;
    }
    addFavoriteCity(
      cityWeather.cityName,
      cityWeather.countryShortName,
      cityWeather.lat,
      cityWeather.lon
    );
  };

  const handleRemoveFavoriteCityClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (!cityWeather) return;
    removeFavoriteCity(cityWeather.cityName, cityWeather.countryShortName);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={
        isFavorited ? handleRemoveFavoriteCityClick : handleAddFavoriteCityClick
      }
    >
      {isFavorited ? <GoStarFill size={size} /> : <GoStar size={size} />}
    </Button>
  );
}
