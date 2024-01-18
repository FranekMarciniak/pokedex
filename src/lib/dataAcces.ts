import { getApiUrl } from "pokedex/server/common";
import { type GETPokemonsResponse } from "./types";

export const fetchPokemonList = async (searchParams: string) => {
  const response = await fetch(`${getApiUrl()}/api/pokemons?${searchParams}`);
  const data = (await response.json()) as GETPokemonsResponse;
  return data;
};
