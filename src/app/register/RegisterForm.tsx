"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "pokedex/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "pokedex/components/ui/form";
import { Input } from "pokedex/components/ui/input";
import { useToast } from "pokedex/components/ui/use-toast";
import { useRegister } from "pokedex/hooks/useRegister";
import { loginSchema, type RegisterSchema } from "pokedex/lib/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register } = useRegister();
  const { toast } = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    setLoading(true);
    try {
      const res = await register(values);
      if (!res.ok) {
        const error = (await res.json()) as { message: string };
        toast({
          title: "Error",
          description: error?.message ?? "Something went wrong",
          variant: "destructive",
        });
      }
      await signIn("credentials", {
        callbackUrl: "/",
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@domain.com" type="email" {...field} />
              </FormControl>
              <FormDescription>
                Email address used to create your account and login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Password used to login to your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
