import { type ShortPokemon } from "pokedex/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { capitalize } from "pokedex/lib/utlis";
import { Badge } from "../ui/badge";
import Link from "next/link";

type Props = {
  pokemon: ShortPokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Card className="w-[200px] ">
      <div className="bg-transparent opacity-100 hover:opacity-85">
        <Link href={`/pokemon/${pokemon.id}`}>
          <CardHeader>
            <CardTitle>{capitalize(pokemon.name)}</CardTitle>
            <CardDescription>Pokedex ID: {pokemon.pokedexId}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={pokemon.imgUrl}
              alt={pokemon.name}
              width={300}
              height={300}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            {pokemon?.type?.map((type) => (
              <Badge key={type}>{capitalize(type)}</Badge>
            )) ?? <Badge>Unknown</Badge>}
          </CardFooter>
        </Link>
      </div>
    </Card>
  );
};

export { PokemonCard };
