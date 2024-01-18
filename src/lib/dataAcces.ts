import { getApiUrl } from "pokedex/server/common";
import { type GETPokemonsResponse } from "./types";
import { type Pokemon } from "@prisma/client";
import { type UpdatePokemonSchema } from "./validators";

export const fetchPokemonList = async (searchParams: string) => {
  const response = await fetch(`${getApiUrl()}/api/pokemons?${searchParams}`, {
    cache: "no-store",
  });
  const data = (await response.json()) as GETPokemonsResponse;
  return data;
};

export const fetchPokemon = async (id: string) => {
  const response = await fetch(`${getApiUrl()}/api/pokemon/${id}`, {
    cache: "default",
  });
  const data = (await response.json()) as Pokemon;
  return data;
};

export const editPokemon = async (pokemon: UpdatePokemonSchema) => {
  const response = await fetch(`${getApiUrl()}/api/pokemon/${pokemon.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = (await response.json()) as Pokemon;

  return data;
};
