"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return !pathname.includes("admin/login") ? (
    <div className="flex min-h-[100vh] ">
      <Sidebar />
      <main className="flex-1 min-h-[100vh]">{children}</main>
    </div>
  ) : (
    children
  );
};

export default AdminLayout;
