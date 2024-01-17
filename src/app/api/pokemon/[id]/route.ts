import { type NextRequest } from "next/server";
import {
  BadRequest,
  InternalServerError,
  NotFound,
  Ok,
  Unauthorized,
} from "pokedex/server/common";
import { getServerAuthSession } from "pokedex/server/auth";
import { db } from "pokedex/server/db";
import { z } from "zod";
import { updatePokemonSchema } from "pokedex/lib/validators";

const paramsSchema = z.object({
  id: z.string().transform((a) => (a ? parseInt(a) : undefined)),
});

type Params = z.infer<typeof paramsSchema>;

export async function GET(req: NextRequest, options: { params: Params }) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return Unauthorized("You must be logged in to access this resource");
    }
    const { id } = paramsSchema.parse(options.params);

    if (!id) {
      return BadRequest("Pokemon ID is required");
    }

    const pokemon = await db.pokemon.findUnique({
      where: { id },
    });

    return Ok(pokemon);
  } catch (error) {
    return InternalServerError(
      `Something went wrong ${(error as Error)?.message ?? ""}`,
    );
  }
}

export async function DELETE(req: NextRequest, options: { params: Params }) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return Unauthorized("You must be logged in to access this resource");
    }
    const { id } = paramsSchema.parse(options.params);

    if (!id) {
      return BadRequest("Pokemon ID is required");
    }

    const pokemon = await db.pokemon.delete({
      where: { id },
    });

    return Ok(pokemon);
  } catch (error) {
    return InternalServerError(
      `Something went wrong ${(error as Error)?.message ?? ""}`,
    );
  }
}

export async function PUT(req: NextRequest, options: { params: Params }) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return Unauthorized("You must be logged in to access this resource");
    }
    const { id } = paramsSchema.parse(options.params);

    if (!id) {
      return BadRequest("Pokemon ID is required");
    }

    const reqPokemon = (await req.json()) as unknown;
    const parsedPokemon = updatePokemonSchema.parse(reqPokemon);

    const dbPokemon = await db.pokemon.findUnique({
      where: { id: parsedPokemon.id },
    });

    if (!dbPokemon) {
      return NotFound("Pokemon with this ID doesn't exist");
    }

    const dbPokemonWithSamePokedexIdOrName = await db.pokemon.findUnique({
      where: { pokedexId: parsedPokemon.pokedexId, name: parsedPokemon.name },
    });

    if (
      dbPokemonWithSamePokedexIdOrName &&
      dbPokemonWithSamePokedexIdOrName.id !== dbPokemon.id
    ) {
      return BadRequest("Pokemon with this pokedexID or name already exists");
    }

    const res = await db.pokemon.update({
      where: { id: parsedPokemon.id },
      data: { ...dbPokemon, ...parsedPokemon },
    });

    return Ok(res);
  } catch (error) {
    return InternalServerError(
      `Something went wrong ${(error as Error)?.message ?? ""}`,
    );
  }
}
