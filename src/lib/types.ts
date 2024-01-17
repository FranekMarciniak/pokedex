export type ShortPokemon = {
  type: string[];
  pokedexId: number;
  name: string;
  imgUrl: string;
  weight: number | null;
  height: number | null;
  id: number;
};
export type GETPokemonsResponse = { result: ShortPokemon[]; count: number };
