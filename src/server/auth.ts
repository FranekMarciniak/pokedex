import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User as NextAuthUser,
  type Session,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "pokedex/server/db";
import { type JWT } from "next-auth/jwt";
import { type AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

async function authorizeUser(
  email: string,
  password: string,
): Promise<NextAuthUser | null> {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await compare(password, user.password))) {
    return null;
  }

  return { id: user.id, email: user.email };
}

const jwtCallback = ({
  token,
  user,
}: {
  token: JWT;
  user?: NextAuthUser | AdapterUser;
}) => {
  if (user) {
    return { ...token, id: user.id };
  }
  return token;
};

const sessionCallback = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => ({
  ...session,
  user: {
    ...session.user,
    id: token.id,
  },
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@pokemon.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        return authorizeUser(
          credentials?.email ?? "",
          credentials?.password ?? "",
        );
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "default-secret",
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
