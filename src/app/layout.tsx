import "pokedex/styles/globals.css";

import { Inter } from "next/font/google";
import { BaseLayout } from "pokedex/components/ui/baseLayout";
import { Toaster } from "pokedex/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Pokedex",
  description: "Pokemon manager by Franek Marciniak",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <BaseLayout>{children}</BaseLayout>
        <Toaster />
      </body>
    </html>
  );
}
