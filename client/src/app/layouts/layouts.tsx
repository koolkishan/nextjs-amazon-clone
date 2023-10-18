"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import AdminLayout from "./admin-layout";
import ClientStoreLayout from "./client-store-layout";
import { useAppStore } from "@/store/store";
import { me } from "@/lib/api/auth";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

const Layouts = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { userInfo, setUserInfo, toasts, clearToast, setToast } = useAppStore();
  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      clearToast();
    }
  }, [toasts, clearToast]);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await me();
        if (
          response instanceof AxiosError &&
          response.response?.data.statusCode === 500
        ) {
          setToast("JWT Token Expired Please Login Again.");
          localStorage.removeItem("accessToken");
          setUserInfo(undefined);
        }
        if (response?.id) {
          setUserInfo(response);
        }
      } catch (err) {}
    };
    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo]);
  return (
    <>
      {pathname.includes("/admin") ? (
        <AdminLayout>{children} </AdminLayout>
      ) : (
        <ClientStoreLayout>{children}</ClientStoreLayout>
      )}
      <ToastContainer />
    </>
  );
};

export default Layouts;
