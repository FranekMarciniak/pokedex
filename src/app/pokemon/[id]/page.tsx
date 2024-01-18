import { redirect } from "next/navigation";
import PokemonView from "pokedex/components/pokemon/PokemonView";
import { fetchPokemon } from "pokedex/lib/dataAcces";

export default async function Page({ params }: { params: { id: string } }) {
  const pokemon = await fetchPokemon(params.id);

  if (!pokemon) {
    redirect("/404");
  }

  return <PokemonView pokemon={pokemon} />;
}
