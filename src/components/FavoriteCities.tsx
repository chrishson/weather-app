"use client";

import { useFavoriteCitiesStore } from "@/stores/favoriteCitiesStore";

export default function FavoriteCities() {
  const { favoriteCitiesIds, removeFavoriteCityId } = useFavoriteCitiesStore();

  return (
    <div>
      {favoriteCitiesIds.map((cityId) => {
        return (
          <div key={cityId}>
            <p>{cityId}</p>
            <button onClick={() => removeFavoriteCityId(cityId)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}
