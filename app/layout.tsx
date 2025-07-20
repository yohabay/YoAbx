import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YoAbx",
  description: "YoAbx developer portfolio",
  generator: "YoAbx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <title>YoAbx</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
