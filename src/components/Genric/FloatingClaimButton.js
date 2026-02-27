"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const DEFAULT_STYLE = {
  left: "1.25rem",
  bottom: "1.25rem",
  top: "auto",
  transform: "translate3d(0, 0, 0)",
};

export default function FloatingClaimButton() {
  const pathname = usePathname();
  const [isHeroMode, setIsHeroMode] = useState(false);
  const [positionStyle, setPositionStyle] = useState(DEFAULT_STYLE);

  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setIsHeroMode(false);
      setPositionStyle(DEFAULT_STYLE);
      return;
    }

    const heroSection = document.getElementById("home-hero-section");
    const heroAnchor = document.getElementById("claim-button-anchor");

    if (!heroSection || !heroAnchor) {
      setIsHeroMode(false);
      setPositionStyle(DEFAULT_STYLE);
      return;
    }

    const updateHeroPosition = () => {
      const rect = heroAnchor.getBoundingClientRect();
      const buttonTop = Math.min(rect.bottom + 12, window.innerHeight - 72);
      const buttonLeft = Math.max(rect.left, 16);

      setPositionStyle({
        top: `${buttonTop}px`,
        left: `${buttonLeft}px`,
        bottom: "auto",
        transform: "translate3d(0, 0, 0)",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldUseHeroPosition = entry.isIntersecting && entry.intersectionRatio > 0.55;
        setIsHeroMode(shouldUseHeroPosition);

        if (shouldUseHeroPosition) {
          updateHeroPosition();
        } else {
          setPositionStyle(DEFAULT_STYLE);
        }
      },
      { threshold: [0.25, 0.55, 0.75] }
    );

    observer.observe(heroSection);

    const onViewportChange = () => {
      if (isHeroMode) {
        updateHeroPosition();
      }
    };

    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange);
    updateHeroPosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
    };
  }, [isHomePage, isHeroMode]);

  return (
    <a
      href="/login"
      style={positionStyle}
      className="fixed z-40 rounded-2xl bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(123,31,162,0.45)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(216,27,96,0.6)] hover:brightness-110"
    >
      Claim your health identity
    </a>
  );
}
