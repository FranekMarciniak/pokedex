import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = LoginSchema;

const basePokemonRequestSchema = {
  pokedexId: z.coerce.number(),
  name: z.string(),
  imgUrl: z.string(),
  shinyImgUrl: z.string().optional(),
  weight: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  hp: z.coerce.number().optional(),
  attack: z.coerce.number().optional(),
  defense: z.coerce.number().optional(),
  spAttack: z.coerce.number().optional(),
  spDefense: z.coerce.number().optional(),
  speed: z.coerce.number().optional(),
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
