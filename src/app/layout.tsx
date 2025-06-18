import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dressify",
  description: "Discover the latest fashion trends with Dressify, your go-to online clothing store. Shop now for stylish outfits and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
