"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import AdminLayout from "./admin-layout";
import ClientStoreLayout from "./client-store-layout";
import { useAppStore } from "@/store/store";
import { me } from "@/lib/api/auth";

const Layouts = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { userInfo, setUserInfo } = useAppStore();
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await me();
      console.log({ response });
      if (response?.id) {
        setUserInfo(response);
      }
    };
    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo]);
  return pathname.includes("/admin") ? (
    <AdminLayout>{children} </AdminLayout>
  ) : (
    <ClientStoreLayout>{children}</ClientStoreLayout>
  );
};

export default Layouts;
