import { Navbar } from "@/components/client/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientStoreLayout from "./layouts/client-store-layout";
import AdminLayout from "./layouts/admin-layout";
import { usePathname } from "next/navigation";
import Layouts from "./layouts/layouts";
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
    <html lang="en">
      <body className={inter.className}>
        <Layouts>{children}</Layouts>
      </body>
    </html>
  );
}
