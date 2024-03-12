import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useToast } from "../ui/use-toast";

type FavoriteButtonProps = {
  size?: number;
};

export default function FavoriteButton({ size = 24 }: FavoriteButtonProps) {
  const { toast } = useToast();
  const { cityWeather } = useFocusedWeatherState();
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
    <button
      className="cursor-pointer"
      onClick={
        isFavorited ? handleRemoveFavoriteCityClick : handleAddFavoriteCityClick
      }
    >
      {isFavorited ? (
        <MdFavorite size={size} />
      ) : (
        <MdFavoriteBorder size={size} />
      )}
    </button>
  );
}
