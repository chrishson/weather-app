"use client";

import FavoriteCities from "@/components/features/FavoriteCities";
import FocusedWeather from "@/components/features/FocusedWeather";
import SearchBox from "@/components/features/SearchBox";
import TemperatureUnitToggleButton from "@/components/shared/TemperatureUnitToggleButton";
import RefreshButton from "@/components/shared/RefreshButton";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";

export default function Home() {
  return (
    <main className="container flex flex-col h-screen p-2 pb-16 pt-4">
      <div className="flex flex-row-reverse md:flex-row w-full items-center justify-end gap-3 pb-4">
        <RefreshButton />
        <TemperatureUnitToggleButton />
        <ThemeToggleButton />
        <SearchBox />
      </div>
      <div className="flex flex-col md:flex-row flex-grow gap-3 pb-4">
        <FocusedWeather />
        <FavoriteCities />
      </div>
    </main>
  );
}
