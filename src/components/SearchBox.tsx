"use client";

import { useFocusedWeatherState } from "@/stores/focusedWeatherStore";
import { useState } from "react";

export default function SearchBox() {
  // TODO: Add Auto Complete Search Box so that user can search for city in right country

  const { setWeatherData } = useFocusedWeatherState();
  const [value, setValue] = useState("");

  const fetchData = async (city: string) => {
    const response = await fetch(
      `/api/weather/search?city=${city}&country_code=CA`
    );

    const data = await response.json();

    setWeatherData(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    fetchData(value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}
