import { getServerAuthSession } from "pokedex/server/auth";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerAuthSession();
  if (session) {
    return redirect("/");
  }

  return (
    <>
      <h1 className="mb-10 mt-4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Register to use the Pokedex
      </h1>
      <RegisterForm />
    </>
  );
};

export default Page;
