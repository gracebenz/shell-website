import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Glass or Tu",
  description: "Events and writing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
