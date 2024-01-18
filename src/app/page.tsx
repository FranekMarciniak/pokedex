import { Suspense } from "react";
import { PokemonList } from "pokedex/components/pokemons/PokemonList";
import { PokemonSort } from "pokedex/components/pokemons/PokemonSort";
import { PokemonSearch } from "pokedex/components/pokemons";

export default async function Page({
  searchParams,
}: {
  searchParams:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined;
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex w-full justify-between py-6">
          <PokemonSort />
          <PokemonSearch />
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
