"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const ACTIVE_TEXT_GRADIENT =
  "bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (url) => {
    if (url === "/") {
      return pathname === "/";
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const navLinkClass = (url) =>
    `group flex items-center gap-1 ${isActive(url) ? ACTIVE_TEXT_GRADIENT : "text-[#282672] hover:opacity-70"}`;

  const arrowClass = (url) =>
    `transition-transform duration-200 ${
      isActive(url) ? ACTIVE_TEXT_GRADIENT : "text-[#282672] group-hover:rotate-45"
    }`;

  const renderArrow = (url) => {
    if (isActive(url)) {
      return <FiArrowRight size={18} className={arrowClass(url)} />;
    }

    return <FiArrowUpRight size={18} className={arrowClass(url)} />;
  };

  return (
    <header
      className="
        sticky z-50 w-[95%] max-w-[1320px] mx-auto
        top-2
        md:fixed md:top-4 md:left-1/2 md:-translate-x-1/2
      "
    >
      <div
        className="
          bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/60 gap-2
          rounded-[18px]
          md:rounded-[50px]
        "
      >
        <div className="flex items-center px-4 md:px-10 h-[64px] md:h-[72px]">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/images/ml_logo.png"
              alt="Medibank Logo"
              width={110}
              height={40}
              className="h-auto w-[96px] md:w-[110px]"
              priority
            />
          </a>

          <nav className="hidden lg:flex items-center ml-auto gap-14 text-[15px] font-semibold">
            <a href="/" className={navLinkClass("/")}>
              Home {renderArrow("/")}
            </a>

            <a href="/doctors" className={navLinkClass("/doctors")}>
              For Doctors {renderArrow("/doctors")}
            </a>

            <a href="/users" className={navLinkClass("/users")}>
              For Users {renderArrow("/users")}
            </a>

            <a href="/partners" className={navLinkClass("/partners")}>
              Partners {renderArrow("/partners")}
            </a>

            <div className="relative group">
              <a href="/resources" className={navLinkClass("/resources")}>
                Resources {renderArrow("/resources")}
              </a>
              <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block w-[145px] rounded-2xl bg-white shadow-xl border p-3">
                <a className="block rounded-xl py-1  hover:bg-gray-50" href="/resources#abha-abdm">
                  ABHA / ABDM
                </a>
                <a className="block rounded-xl py-1 hover:bg-gray-50" href="/resources#health-guides">
                  Health Guides
                </a>
                <a className="block rounded-xl py-1 hover:bg-gray-50" href="/resources#blogs">
                  Blog
                </a>
                <a className="block rounded-xl py-1 hover:bg-gray-50" href="/resources#privacy-policy">
                  Privacy policy
                </a>
              </div>
            </div>

            <div className="relative group">
              <a href="/about" className={navLinkClass("/about")}>
                About Us {renderArrow("/about")}
              </a>
              <div className="absolute right-0 top-full hidden group-hover:block group-focus-within:block w-[100px] rounded-2xl bg-white shadow-xl border p-3">
                <a className="block rounded-xl py-1 hover:bg-gray-50" href="/about#about1">
                  Our Story
                </a>
                <a className="block rounded-xl py-1 hover:bg-gray-50" href="/about#about2">
                  Our Team
                </a>
                <a className="block rounded-xl py-1 hover:bg-gray-50" href="/about#about3">
                  Careers
                </a>
                <a className="block rounded-xl py-1 hover:bg-gray-50" href="/about#about4">
                  Contact Us
                </a>
              </div>
            </div>

            <a href="/blog" className={navLinkClass("/blog")}>
              Blog {renderArrow("/blog")}
            </a>
          </nav>

          <button
            className="lg:hidden ml-auto text-[32px] text-[#1d4ed8] px-2"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[420px] pb-2 md:pb-4" : "max-h-0"
          }`}
        >
          <div className="px-2 md:px-4 flex flex-col gap-2">
            {[
              { url: "/", name: "Home" },
              { url: "/doctors", name: "For Doctors" },
              { url: "/users", name: "For Users" },
              { url: "/partners", name: "Partners" },
              { url: "/resources", name: "Resources" },
              { url: "/about", name: "About Us" },
              { url: "/blog", name: "Blog" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.url}
                className={`rounded-2xl border bg-white px-4 py-3 font-semibold inline-flex items-center justify-between ${
                  isActive(item.url) ? ACTIVE_TEXT_GRADIENT : "text-[#282672]"
                }`}
              >
                {item.name}
                {isActive(item.url) ? (
                  <FiArrowRight size={18} className={ACTIVE_TEXT_GRADIENT} />
                ) : (
                  <FiArrowUpRight size={18} className="text-[#282672]" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
