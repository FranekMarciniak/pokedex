import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useToast } from "pokedex/components/ui/use-toast";

const usePokemonSearch = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 100);
  const { toast } = useToast();

  useEffect(() => {
    const name = params.get("name");
    setSearch(name ?? "");
  }, [params]);

  useEffect(() => {
    const handleSearch = async (name: string) => {
      const searchParams = new URLSearchParams(params);
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
  }, [debouncedValue, params, pathname, router, toast]);

  return {
    search,
    setSearch,
  };
};

export { usePokemonSearch };
