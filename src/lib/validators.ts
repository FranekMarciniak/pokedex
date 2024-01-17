import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = LoginSchema;

const basePokemonRequestSchema = {
  pokedexId: z.number(),
  name: z.string(),
  imgUrl: z.string(),
  shinyImgUrl: z.string().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  hp: z.number().optional(),
  attack: z.number().optional(),
  defense: z.number().optional(),
  spAttack: z.number().optional(),
  spDefense: z.number().optional(),
  speed: z.number().optional(),
  category: z.string().optional(),
  type: z.array(z.string()),
};
export const createPokemonSchema = z.object(basePokemonRequestSchema);

export type CreatePokemonSchema = z.infer<typeof createPokemonSchema>;

export const updatePokemonSchema = z.object({
  ...basePokemonRequestSchema,
  id: z.number(),
});

export type UpdatePokemonSchema = z.infer<typeof updatePokemonSchema>;

export const pokemonQuerySchema = z.object({
  page: z.string().optional(),
  limit: z
    .union([z.literal("10"), z.literal("20"), z.literal("50")])
    .optional(),
  sortBy: z
    .union([
      z.literal("name"),
      z.literal("height"),
      z.literal("weight"),
      z.literal("pokedexId"),
    ])
    .optional(),
  order: z.union([z.literal("asc"), z.literal("desc")]).optional(),
  name: z.string().optional(),
  minHeight: z
    .string()
    .optional()
    .transform((a) => (a ? parseInt(a) : undefined)),
  maxHeight: z
    .string()
    .optional()
    .transform((a) => (a ? parseInt(a) : undefined)),
  minWeight: z
    .string()
    .optional()
    .transform((a) => (a ? parseInt(a) : undefined)),
  maxWeight: z
    .string()
    .optional()
    .transform((a) => (a ? parseInt(a) : undefined)),
});
