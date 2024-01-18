import { getApiUrl } from "pokedex/server/common";
import { type GETPokemonsResponse } from "./types";

export const fetchPokemonList = async (searchParams: string) => {
  try {
    const response = await fetch(
      `${getApiUrl()}/api/pokemons?${searchParams}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = (await response.json()) as GETPokemonsResponse;
    return data;
  } catch (error) {
    return {
      result: [],
      count: 0,
    };
  }
};
