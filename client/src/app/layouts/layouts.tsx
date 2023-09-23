"use client";
import { usePathname } from "next/navigation";
import React from "react";
import AdminLayout from "./admin-layout";
import ClientStoreLayout from "./client-store-layout";

const Layouts = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return pathname.includes("/admin") ? (
    <AdminLayout>{children} </AdminLayout>
  ) : (
    <ClientStoreLayout>{children}</ClientStoreLayout>
  );
};

export default Layouts;
