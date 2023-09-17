"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/client/navbar";

const ClientStoreLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return !pathname.includes("login") ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    children
  );
};

export default ClientStoreLayout;
