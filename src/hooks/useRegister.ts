import { type RegisterSchema } from "pokedex/lib/validators";

export const useRegister = () => {
  const register = async ({ email, password }: RegisterSchema) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response;
  };

  return { register };
};
