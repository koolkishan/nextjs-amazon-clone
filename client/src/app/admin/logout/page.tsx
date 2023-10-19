"use client";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { setUserInfo } = useAppStore();
  const router = useRouter();
  useEffect(() => {
    setUserInfo(undefined);
    localStorage.clear();
    router.push("/admin/login");
  }, [setUserInfo, router]);

  return null;
};

export default Page;
