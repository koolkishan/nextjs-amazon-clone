"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/client/navbar";
import { Footer } from "@/components/client/footer";

const ClientStoreLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return !pathname.includes("login") && !pathname.includes("signup") ? (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <main className="flex-1 min-h-[100vh]">{children}</main>
      <Footer />
    </div>
  ) : (
    children
  );
};

export default ClientStoreLayout;
