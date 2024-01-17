import { headers } from "next/headers";
import { getApiUrl } from "pokedex/server/common";
import { type GETPokemonsResponse } from "./types";

export const fetchPokemonList = async (searchParams: string) => {
  const response = await fetch(`${getApiUrl()}/api/pokemons?${searchParams}`, {
    headers: headers(),
  });
  const data = (await response.json()) as GETPokemonsResponse;
  return data;
};
