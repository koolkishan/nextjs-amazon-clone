"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const [isLoaded, setisLoaded] = useState(false);
  const router = useRouter();
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
        setisLoaded(true);
      } catch (err) {}
    };
    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo, setToast, setUserInfo]);

  useEffect(() => {
    if (
      isLoaded &&
      pathname.includes("/admin") &&
      pathname !== "/admin/login" &&
      pathname !== "/admin/logout"
    ) {
      if (!userInfo) {
        setToast("Please Login.");
        router.push("/admin/login");
      } else if (!userInfo.isAdmin) {
        setToast("Login with Admin user.");
        router.push("/");
      }
    }
  }, [pathname, isLoaded, userInfo, setToast, router]);

  return (
    <>
      {isLoaded ? (
        <>
          {pathname.includes("/admin") ? (
            <AdminLayout>{children} </AdminLayout>
          ) : (
            <ClientStoreLayout>{children}</ClientStoreLayout>
          )}
        </>
      ) : null}
      <ToastContainer />
    </>
  );
};

export default Layouts;
