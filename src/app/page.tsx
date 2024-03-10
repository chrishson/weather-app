import FocusedWeather from "@/components/FocusedWeather";
import SearchBox from "@/components/SearchBox";
import dynamic from "next/dynamic";

// TODO: For Today, do Search, Allow add and remove to favorite city ids

// Disabling SSR on Favorite Cities as it uses Local Storage to persist data. This prevents hydration error.
const FavoriteCities = dynamic(() => import("@/components/FavoriteCities"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FavoriteCities />
      <SearchBox />
      <FocusedWeather />
    </main>
  );
}
