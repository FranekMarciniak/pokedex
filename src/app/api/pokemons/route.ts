import { type z } from "zod";
import { type NextRequest } from "next/server";
import { InternalServerError, Ok } from "pokedex/server/common";
import { db } from "pokedex/server/db";
import { pokemonQuerySchema } from "pokedex/lib/validators";

type QueryParams = z.infer<typeof pokemonQuerySchema>;

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsedQuery: QueryParams = pokemonQuerySchema.parse(params);

    const page = parseInt(parsedQuery.page ?? "1");
    const limit = parseInt(parsedQuery.limit ?? "10");
    const skip = (page - 1) * limit;
    const sortBy = parsedQuery.sortBy
      ? [{ [parsedQuery.sortBy ?? "pokedexId"]: parsedQuery.order ?? "asc" }]
      : null;

    const where = {
      name: parsedQuery.name ? { contains: parsedQuery.name } : undefined,
      height: {
        gte: parsedQuery.minHeight,
        lte: parsedQuery.maxHeight,
      },
      weight: {
        gte: parsedQuery.minWeight,
        lte: parsedQuery.maxWeight,
      },
    };
    const count = await db.pokemon.count({ where });
    const pokemons = await db.pokemon.findMany({
      where,
      skip,
      take: limit,
      orderBy: sortBy ? sortBy : [{ pokedexId: "asc" }],
      select: {
        name: true,
        height: true,
        weight: true,
        imgUrl: true,
        pokedexId: true,
        type: true,
        id: true,
      },
    });

    return Ok({ result: pokemons, count });
  } catch (error) {
    return InternalServerError("Something went wrong");
  }
}
