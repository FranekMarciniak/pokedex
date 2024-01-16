import { getServerAuthSession } from "pokedex/server/auth";

export default async function HomePage() {
  const data = await getServerAuthSession();

  return <main>{data?.user.email}</main>;
}
