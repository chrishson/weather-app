"use client";

import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// Most of this code is from the use-places-autocomplete documentation.
export default function SearchBox() {
  const { setWeatherData } = useFocusedWeatherState();
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

  const fetchData = async (
    cityName: string,
    countryShortName: string,
    lat: number,
    lng: number
  ) => {
    const response = await fetch(`/api/weather/search?lat=${lat}&lon=${lng}`);

    const data = await response.json();

    setWeatherData({ ...data, cityName, countryShortName });
  };

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: any) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const addressComponents = results[0]?.address_components;
        const cityName = addressComponents[0].long_name;
        const countryShortName =
          addressComponents[addressComponents.length - 1].short_name;
        const { lat, lng } = getLatLng(results[0]);
        fetchData(cityName, countryShortName, lat, lng);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Hows the weather in...?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
