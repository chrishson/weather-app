import FocusedWeather from "@/components/features/FocusedWeather";
import SearchBox from "@/components/features/SearchBox";
import dynamic from "next/dynamic";

// TODO: For Today, do Search, Allow add and remove to favorite city ids

// Disabling SSR on Favorite Cities as it uses Local Storage to persist data. This prevents hydration error.
const FavoriteCities = dynamic(
  () => import("@/components/features/FavoriteCities"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main className="flex flex-col h-screen p-2 pb-16 pt-4">
      <div className="flex w-full items-center justify-end pb-4">
        <SearchBox />
      </div>
      <div className="flex flex-col md:flex-row flex-grow gap-3">
        <FocusedWeather />
        <FavoriteCities />
      </div>
    </main>
  );
}
