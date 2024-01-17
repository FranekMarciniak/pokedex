import { type z } from "zod";
import { type NextRequest } from "next/server";
import { InternalServerError, Ok, Unauthorized } from "pokedex/server/common";
import { getServerAuthSession } from "pokedex/server/auth";
import { db } from "pokedex/server/db";
import { pokemonQuerySchema } from "pokedex/lib/validators";

type QueryParams = z.infer<typeof pokemonQuerySchema>;

export async function GET(req: NextRequest) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return Unauthorized("You must be logged in to access this resource");
    }
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsedQuery: QueryParams = pokemonQuerySchema.parse(params);

    const page = parseInt(parsedQuery.page ?? "1");
    const limit = parseInt(parsedQuery.limit ?? "10");
    const skip = (page - 1) * limit;
    const sortBy = parsedQuery.sortBy
      ? [{ [parsedQuery.sortBy ?? "pokedexId"]: parsedQuery.order ?? "asc" }]
      : {};

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
      orderBy: sortBy,
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
