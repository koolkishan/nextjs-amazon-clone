import { Navbar } from "@/components/client/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layouts from "./layouts/layouts";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon Clone",
  description:
    "Created by Kishan Sheth for Youtube. Just for learning purposes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Layouts>{children}</Layouts>
        </Providers>
      </body>
    </html>
  );
}
