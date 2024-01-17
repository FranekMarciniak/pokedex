import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useToast } from "pokedex/components/ui/use-toast";

const usePokemonSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 500);
  const { toast } = useToast();

  useEffect(() => {
    const name = searchParams.get("name");
    setSearch(name ?? "");
  }, [searchParams]);

  useEffect(() => {
    const handleSearch = async (name: string) => {
      const searchParams = new URLSearchParams();
      searchParams.set("name", name);
      router.replace(`${pathname}?${searchParams.toString()}`, {
        scroll: false,
      });
    };

    handleSearch(debouncedValue).catch((error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while searching for pokemons",
        variant: "destructive",
      });
    });
  }, [debouncedValue, pathname, router, toast]);

  return {
    search,
    setSearch,
  };
};

export { usePokemonSearch };
