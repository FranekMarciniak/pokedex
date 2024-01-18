import { Suspense } from "react";
import { PokemonList } from "pokedex/components/pokemons/PokemonList";
import { PokemonSort } from "pokedex/components/pokemons/PokemonSort";
import { Loader2 } from "lucide-react";
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
      <Suspense
        fallback={
          <div>
            <Loader2 />
          </div>
        }
      >
        <div className="flex w-full justify-between py-6">
          <PokemonSort />
          <PokemonSearch />
        </div>
      </Suspense>
      <Suspense
        fallback={
          <div>
            <Loader2 />
          </div>
        }
      >
        <PokemonList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
