import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type SortOption = {
  value: string;
  label: string;
  order: "asc" | "desc";
  id: string;
};

const SortOptions = [
  {
    value: "pokedexId",
    label: "Pokedex ID Ascending",
    order: "asc",
    id: "pokedexId&asc",
  },
  {
    value: "pokedexId",
    label: "Pokedex ID Descending",
    order: "desc",
    id: "pokedexId&desc",
  },
  { value: "name", label: "Name Ascending", order: "asc", id: "name&asc" },
  { value: "name", label: "Name Descending", order: "desc", id: "name&desc" },
  {
    value: "height",
    label: "Height Ascending",
    order: "asc",
    id: "height&asc",
  },
  {
    value: "height",
    label: "Height Descending",
    order: "desc",
    id: "height&desc",
  },
  {
    value: "weight",
    label: "Weight Ascending",
    order: "asc",
    id: "weight&asc",
  },
  {
    value: "weight",
    label: "Weight Descending",
    order: "desc",
    id: "weight&desc",
  },
];

const usePokemonSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [sortBy, setSortBy] = useState<SortOption | undefined>();
  const getSortBy = useCallback((id: SortOption["id"]) => {
    const sortBy = SortOptions.find((option) => option.id === id);
    return sortBy ?? SortOptions[0];
  }, []);

  useEffect(() => {
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");
    const id = `${sortBy}&${order}`;
    const sortByOption = getSortBy(id) as SortOption;
    setSortBy(sortByOption);
  }, [getSortBy, searchParams]);

  const handleSortByChange = async (optionId: SortOption["id"]) => {
    const option = getSortBy(optionId) as SortOption;
    setSortBy(option);

    const searchParams = new URLSearchParams();
    searchParams.set("sortBy", option.value);
    searchParams.set("order", option.order);
    router.replace(`${pathname}?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  return {
    sortBy,
    handleSortByChange,
    SortOptions,
  };
};

export { usePokemonSort };
