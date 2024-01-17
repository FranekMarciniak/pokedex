"use client";
import { usePokemonSearch } from "pokedex/hooks/usePokemonSearch";
import { Input } from "../ui/input";

const PokemonSearch = () => {
  const { setSearch, search } = usePokemonSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Input
      value={search}
      onChange={handleSearch}
      placeholder="Pokemon name"
      className="w-60"
    />
  );
};

export { PokemonSearch };
