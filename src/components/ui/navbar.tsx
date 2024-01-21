"use client";
import { Button, buttonVariants } from "./button";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useToast } from "./use-toast";
import { useState } from "react";
import { cn } from "pokedex/lib/utlis";

const Navbar = () => {
  const session = useSession();

  return (
    <nav className="  bg-slate-300 shadow-md">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-end  p-4">
        <NextLink
          href="/"
          className={cn(buttonVariants({ variant: "outline" }), "mr-auto")}
        >
          Pokedex
        </NextLink>
        {session.status === "authenticated" && <AuthedNavbar />}
        {session.status === "unauthenticated" && <UnauthedNavbar />}
        {session.status === "loading" && "Loading user session..."}
      </div>
    </nav>
  );
};

const AuthedNavbar = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut()
      .catch((error) => {
        toast({
          title: "Error",
          description: (error as Error)?.message ?? "Couldn't sign out",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button onClick={handleSignOut} isLoading={isLoading} disabled={isLoading}>
      Sign out
    </Button>
  );
};

const UnauthedNavbar = () => {
  return (
    <div className="flex gap-4">
      <Button>
        <NextLink href="/register">Register</NextLink>
      </Button>
      <Button>
        <NextLink href="/login">Login</NextLink>
      </Button>
    </div>
  );
};

export { Navbar };
