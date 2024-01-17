import { type User } from "@prisma/client";
import { hash } from "bcryptjs";
import { type LoginSchema } from "pokedex/lib/validators";
import {
  BCRYPT_SALT_ROUNDS,
  BadRequest,
  Created,
  InternalServerError,
} from "pokedex/server/common";
import { db } from "pokedex/server/db";

async function createUser(email: string, password: string) {
  const password_hash = await hash(password, BCRYPT_SALT_ROUNDS);

  return db.user.create({
    data: {
      email: email.toLowerCase(),
      password: password_hash,
    },
  });
}

async function findUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
}

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as LoginSchema;

  try {
    if (!email) {
      return BadRequest("Email is required");
    }

    if (!password) {
      return BadRequest("Password is required");
    }

    const lowerCaseEmail = email.toLowerCase();

    const dbUser = await findUserByEmail(lowerCaseEmail);
    if (dbUser) {
      return BadRequest("User already exists");
    }
    const user = await createUser(lowerCaseEmail, password);

    return Created({ email: user.email, id: user.id });
  } catch (error) {
    console.error(error);
    return InternalServerError("Error when creating user");
  }
}
