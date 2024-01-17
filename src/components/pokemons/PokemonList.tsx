import { fetchPokemonList } from "pokedex/lib/dataAcces";
import { PokemonCard } from "./PokemonCard";
import { PokemonPagination } from "./PokemonPagination";

type Props = {
  searchParams:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined;
};
const PokemonList = async ({ searchParams }: Props) => {
  const pokemons = await fetchPokemonList(
    new URLSearchParams(searchParams).toString(),
  );

  return (
    <>
      <div className=" my-auto grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemons.result.length ? (
          pokemons.result.map((pokemon) => (
            <PokemonCard key={pokemon.pokedexId} pokemon={pokemon} />
          ))
        ) : (
          <div className="pl-2">no pokemon found</div>
        )}
      </div>
      <PokemonPagination count={pokemons.count ?? 0} />
    </>
  );
};

export { PokemonList };
