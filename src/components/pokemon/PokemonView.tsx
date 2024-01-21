import { type Pokemon } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function PokemonView({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="w-full max-w-2xl space-y-4 p-6 text-center">
        <div className="flex flex-col items-center justify-center  space-y-4">
          <Image
            alt="Pokemon Image"
            className="rounded-full"
            height="100"
            src={pokemon.imgUrl}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{pokemon.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">#{pokemon.id}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Weight</h3>
            <p className="text-gray-700 dark:text-gray-300">{pokemon.weight}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Height</h3>
            <p className="text-gray-700 dark:text-gray-300">{pokemon.height}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">HP</h3>
            <p className="text-gray-700 dark:text-gray-300">{pokemon.hp}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Attack</h3>
            <p className="text-gray-700 dark:text-gray-300">{pokemon.attack}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Defense</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {pokemon.defense}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Special Attack</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {pokemon.spAttack}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Special Defense</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {pokemon.spDefense}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Speed</h3>
            <p className="text-gray-700 dark:text-gray-300">{pokemon.speed}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Category</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {pokemon.category}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Type</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {pokemon?.type?.map((type) => type).join(", ") ?? "Unknown"}
            </p>
          </div>
        </div>
        {pokemon.shinyImgUrl && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl font-bold">Shiny {pokemon.name}</h2>
            <Image
              alt="Shiny Pokemon Image"
              className="rounded-full"
              height="100"
              src={pokemon.shinyImgUrl}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
            />
          </div>
        )}
      </div>
      <Link
        href={`/pokemon/${pokemon.id}/edit`}
        className="
        rounded-sm bg-slate-300 p-2"
      >
        Edit this pokemon
      </Link>
    </div>
  );
}
