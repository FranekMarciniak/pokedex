import { type NextRequest } from "next/server";
import {
  BadRequest,
  InternalServerError,
  Ok,
  Unauthorized,
} from "pokedex/server/common";
import { getServerAuthSession } from "pokedex/server/auth";
import { db } from "pokedex/server/db";
import { createPokemonSchema } from "pokedex/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return Unauthorized("You must be logged in to access this resource");
    }
    const reqPokemon = (await req.json()) as unknown;
    const parsedPokemon = createPokemonSchema.parse(reqPokemon);

    const dbPokemon = await db.pokemon.findFirst({
      where: {
        OR: [
          { pokedexId: parsedPokemon.pokedexId },
          { name: parsedPokemon.name },
        ],
      },
    });

    if (dbPokemon) {
      return BadRequest("Pokemon with this pokedexID or name already exists");
    }

    const res = await db.pokemon.create({
      data: parsedPokemon,
    });

    return Ok(res);
  } catch (error) {
    return InternalServerError(
      `Something went wrong ${(error as Error)?.message ?? ""}`,
    );
  }
}
