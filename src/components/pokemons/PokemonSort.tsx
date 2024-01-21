"use client";
import { usePokemonSort } from "pokedex/hooks/usePokemonSort";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PokemonSort = () => {
  const { SortOptions, handleSortByChange, sortBy } = usePokemonSort();
  return (
    <Select
      onValueChange={(value) => handleSortByChange(value)}
      value={sortBy?.id}
    >
      <SelectTrigger className="w-[230px]">
        <SelectValue placeholder="Pick sorting option" />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        {SortOptions.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { PokemonSort };
