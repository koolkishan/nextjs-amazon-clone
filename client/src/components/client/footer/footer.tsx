import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiChevronDown } from "react-icons/bi";

const Footer = () => {
  const footerLinks = [
    {
      title: "Make Money",
      links: [
        "Sell on Amazon",
        "Sell on Amazon Business",
        "Associates Programme",
        "Fullfillment by Amazon",
        "Advertise Your Products",
      ],
    },
    {
      title: "Payment Methods",
      links: [
        "Amazon Payment Methods",
        "Amazon Platinum Mastercard",
        "Amazon Money Store",
        "Gift Cards",
        "Amazon Currency Convertor",
      ],
    },
    {
      title: "Support",
      links: [
        "Track Pacakges or View Orders",
        "Delivery Rates & Policies",
        "Amazon Prime",
        "Returns & Replacements",
      ],
    },
  ];
  return (
    <footer className="bg-amazon-dark min-h-[12vh] flex items-center px-20 h-full text-white gap-10 py-16">
      <div>
        <Link
          href="/"
          className="text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/amazon-logo-white.png"
            alt="amazon logo"
            height={150}
            width={150}
          />
        </Link>
      </div>
      <div className="flex flex-1 justify-between px-20">
        {footerLinks.map((section) => {
          return (
            <div key={section.title} className="flex flex-col gap-2">
              <span className="text-base">{section.title}</span>
              <ul
                key={section.title}
                className="text-base flex flex-col gap-1 font-light"
              >
                {section.links.map((link) => (
                  <li key={link} className="cursor-pointer link-hover">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
