import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const fetchPokemonList = async () => {
  const pokemonLimit = 1000;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}`,
  );
  const pokemons = await res.json();

  return pokemons;
};

const fetchPokemon = async (url) => {
  const res = await fetch(url);
  const pokemon = await res.json();

  return pokemon;
};

const insertPokemon = async (pokemon) => {
  try {
    return await db.pokemon.upsert({
      where: { pokedexId: pokemon.pokedexId },
      update: {
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        imgUrl: pokemon.imgUrl,
        shinyImgUrl: pokemon.shinyImgUrl,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        spAttack: pokemon.spAttack,
        spDefense: pokemon.spDefense,
        speed: pokemon.speed,
        category: pokemon.category,
        type: pokemon.type,
      },
      create: pokemon,
    });
  } catch (error) {
    console.error("Error inserting/updating pokemon:", error);
    throw error;
  }
};

const formatPokemon = (pokemon) => {
  return {
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    imgUrl: pokemon.sprites.front_default,
    shinyImgUrl: pokemon.sprites.front_shiny,
    pokedexId: pokemon.id,
    hp: pokemon.stats[0]?.base_stat ?? 0,
    attack: pokemon.stats[1]?.base_stat ?? 0,
    defense: pokemon.stats[2]?.base_stat ?? 0,
    spAttack: pokemon.stats[3]?.base_stat ?? 0,
    spDefense: pokemon.stats[4]?.base_stat ?? 0,
    speed: pokemon.stats[5]?.base_stat ?? 0,
    category: pokemon.species.name,
    type: pokemon.types.map((type) => type.type.name),
  };
};

const main = async () => {
  const list = await fetchPokemonList();
  const totalPokemons = list?.results?.length;
  const pokemonPerBatch = 166; // Number of pokemons in each batch to avoid API rate limit
  const pokemonsDetails = [];

  for (let i = 0; i < totalPokemons; i += pokemonPerBatch) {
    const pokemonBatch = list.results.slice(i, i + pokemonPerBatch);
    const pokemonDetails = await Promise.all(
      pokemonBatch.map((pokemon) => fetchPokemon(pokemon.url)),
    );
    pokemonsDetails.push(...pokemonDetails);
  }

  const formattedPokemons = pokemonsDetails.map((pokemon) =>
    formatPokemon(pokemon),
  );

  for (const pokemon of formattedPokemons) {
    console.log(`Inserting/updating ${pokemon.name} into the database`);
    await insertPokemon(pokemon);
  }
};

main().catch((error) => {
  console.error(error);
  console.error("error seeding the db");
});
