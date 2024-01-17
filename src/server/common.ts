import { NextResponse } from "next/server";

export const BCRYPT_SALT_ROUNDS = 12;

export const getApiUrl = () => {
  const { NEXT_PUBLIC_URL } = process.env;
  if (!NEXT_PUBLIC_URL) {
    throw new Error("NEXT_PUBLIC_URL is not defined");
  }
  return NEXT_PUBLIC_URL;
};

export const Ok = (data: unknown) => NextResponse.json(data, { status: 200 });

export const Created = (data: unknown) =>
  NextResponse.json(data, { status: 201 });

export const BadRequest = (message: string) =>
  NextResponse.json({ message }, { status: 400 });

export const Unauthorized = (message: string) =>
  NextResponse.json({ message }, { status: 401 });

export const Forbidden = (message: string) =>
  NextResponse.json({ message }, { status: 403 });

export const NotFound = (message: string) =>
  NextResponse.json({ message }, { status: 404 });

export const InternalServerError = (message: string) =>
  NextResponse.json({ message }, { status: 500 });
