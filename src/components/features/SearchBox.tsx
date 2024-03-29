"use client";

import { fetchCityWeather } from "@/lib/utils";
import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input } from "../ui/input";

// Most of this code is from the use-places-autocomplete documentation.
export default function SearchBox() {
  const { setCityWeatherData, setLoadingState } = useFocusedWeatherState();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      types: ["(cities)"],
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, call it to clear and reset the suggestions data
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const fetchAndSetCityWeather = async (
    lat: number,
    lng: number,
    cityName: string,
    countryShortName: string
  ) => {
    setLoadingState(true);
    const data = await fetchCityWeather(lat, lng);
    setCityWeatherData({ ...data, cityName, countryShortName });
    setLoadingState(false);
  };

  const handleSelect =
    ({ description }: any) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue("", false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const addressComponents = results[0]?.address_components;
        const cityName = addressComponents[0].long_name;
        const countryShortName =
          addressComponents[addressComponents.length - 1].short_name;
        const { lat, lng } = getLatLng(results[0]);
        fetchAndSetCityWeather(lat, lng, cityName, countryShortName);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className="relative w-full md:w-auto md:min-w-[280px]" ref={ref}>
      <Input
        type="email"
        placeholder="Search City"
        value={value}
        onChange={handleInput}
        disabled={!ready}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="absolute mt-1 bg-white dark:bg-black border border-white dark:border-white rounded-md shadow-lg z-10 w-full">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
}
