import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BsFillBarChartFill, BsPhoneFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { HiCollection } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";

const Side = () => {
  const router = useRouter();
  const pathname = usePathname();
  // State to keep track of the currently selected item
  const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);
  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/admin/dashboard" },
    {
      label: "Category",
      icon: <BiSolidCategory />,
      subMenuItems: [
        {
          label: "Add Category",
          icon: <MdAddBox />,
          link: "/admin/category/add-category",
        },
        {
          label: "All Category",
          icon: <HiCollection />,
          link: "/admin/category/all-category",
        },
        {
          label: "Reports",
          icon: <BsFillBarChartFill />,
          link: "/admin/category/reports",
        },
      ],
    },
    {
      label: "Product",
      icon: <BsPhoneFill />,
      subMenuItems: [
        {
          label: "Add Product",
          icon: <MdAddBox />,
          link: "/admin/products/add-product",
        },
        {
          label: "All Products",
          icon: <HiCollection />,
          link: "/admin/products/all-products",
        },
        {
          label: "Reports",
          icon: <BsFillBarChartFill />,
          link: "/admin/products/reports",
        },
      ],
    },
    { label: "Orders", icon: <FaShoppingCart />, link: "/admin/orders" },
  ];

  const handleItemClick = (link: string) => {
    // Update the selected item when a menu item is clicked
    setSelectedItem(link);
    router.push(link);
  };

  return (
    <div className="min-h-[100vh]  overflow-hidden">
      <Sidebar
        className="h-full overflow-hidden"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#141B24",
            "&:hover": {
              backgroundColor: "#141B24",
            },
          },
        }}
      >
        <Menu
          className="h-[100vh] max-h-[100vh] text-white overflow-hidden"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              const backgroundColor = level === 0 ? "#141B24" : "#222e3d";

              return {
                backgroundColor: active ? "#ff9900" : backgroundColor,
                "&:hover": {
                  backgroundColor: active ? "#212c3a" : "#2c3a4d",
                },
              };
            },
          }}
        >
          <div className="flex items-center justify-center my-10">
            <Image
              src="/amazon-logo-white.png"
              alt="logo"
              height={150}
              width={150}
              className="cursor-pointer"
              onClick={() => router.push("/admin/dashboard")}
            />
          </div>

          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.subMenuItems ? (
                <SubMenu label={item.label} icon={item.icon}>
                  {item.subMenuItems.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      onClick={() => handleItemClick(subItem.link)}
                      icon={subItem.icon}
                      active={selectedItem === subItem.link}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  onClick={() => handleItemClick(item.link)}
                  icon={item.icon}
                  active={selectedItem === item.link}
                >
                  {item.label}
                </MenuItem>
              )}
            </React.Fragment>
          ))}
          <MenuItem
            onClick={() => handleItemClick("/admin/logout")}
            icon={<LuLogOut />}
            active={selectedItem === "/admin/logout"}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Side;
