"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    var element = document.getElementById("burger");
    if (!isMobileMenuOpen) {
      element && (element.innerHTML = "x");
    } else {
      element && (element.innerHTML = "☰");
    }
  };

  const data = [
    { url: "/", name: "Home" },
    { url: "/doctors", name: "For Doctors" },
    { url: "/users", name: "For Users" },
    { url: "/partners", name: "Partners" },
    { url: "/resources", name: "Resources" },
    { url: "/about", name: "About Us" },
    { url: "/blog", name: "Blog" },
    { url: "/login", name: "Login" },
  ];

  const menu = (
    <>
      {data.map((item, index) => {
        return (
          <a
            key={index}
            href={item.url}
            className="underline-offset-2 hover:underline bg-gradient-to-r from-purple-500 via-red-500 to-blue-700 bg-clip-text text-transparent shadow-md p-1 pl-4 font-semibold rounded-[10px] border"
          >
            {item.name}
          </a>
        );
      })}
    </>
  );

  return (
    <header
      className="
        fixed bg-red z-50 w-[95%] 
        top-0 left-0 translate-x-0
        md:top-4 md:left-1/2 md:-translate-x-1/2
      "
    >
      {/* pill conatainer */}
      <div
        className="
          bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12) border border-white/60 gap-2
          rounded-none
          md:rounded-[50px]
        "
      >
        {/* items container */}
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

          {/* desktop menu */}
          <nav className="hidden text-[#282672] hover:text-[#0B137A] lg:flex items-center ml-auto gap-14 text-[15px] font-semibold text-[#0d0d0d]">
            <a href="/" className="group flex items-center gap-1 hover:opacity-70">
              Home{" "}
              <FiArrowUpRight
                size={18}
                color="282672"
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            <a href="/doctors" className="group flex items-center gap-1 hover:opacity-70">
              For Doctors{" "}
              <FiArrowUpRight
                size={18}
                color="282672"
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            <a href="/users" className="group flex items-center gap-1 hover:opacity-70">
              For Users{" "}
              <FiArrowUpRight
                size={18}
                color="282672"
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            <a href="/partners" className="group flex items-center gap-1 hover:opacity-70">
              Partners{" "}
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            <div className="relative group">
              <a href="/resources" className="group flex items-center gap-1 hover:opacity-70">
                Resources{" "}
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
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
              <a href="/about" className="group flex items-center gap-1 hover:opacity-70">
                About Us{" "}
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
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
          </nav>

          {/* mobile menu button */}
          <button
            className="lg:hidden ml-auto text-[32px] text-[#1d4ed8] px-2"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
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
                className="rounded-2xl border bg-white px-4 py-3 font-semibold"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
