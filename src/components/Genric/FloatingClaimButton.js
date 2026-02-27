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
  const [positionStyle, setPositionStyle] = useState(DEFAULT_STYLE);

  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    if (!isHomePage) {
      setPositionStyle(DEFAULT_STYLE);
      return;
    }

    const heroSection = document.getElementById("home-hero-section");
    const heroAnchor = document.getElementById("claim-button-anchor");

    if (!heroSection || !heroAnchor) {
      setPositionStyle(DEFAULT_STYLE);
      return;
    }

    const updatePosition = () => {
      const heroRect = heroSection.getBoundingClientRect();
      const anchorRect = heroAnchor.getBoundingClientRect();
      const heroScrollProgress = Math.max(0, -heroRect.top) / Math.max(heroRect.height, 1);
      const hasScrolledPastHero = heroScrollProgress >= 0.55;
      const isAnchorAboveViewport = anchorRect.bottom < 72;
      const shouldUseHeroPosition = !hasScrolledPastHero && !isAnchorAboveViewport;

      if (!shouldUseHeroPosition) {
        setPositionStyle(DEFAULT_STYLE);
        return;
      }

      const buttonTop = Math.min(anchorRect.bottom + 12, window.innerHeight - 72);
      const buttonLeft = Math.max(anchorRect.left, 16);

      setPositionStyle({
        top: `${buttonTop}px`,
        left: `${buttonLeft}px`,
        bottom: "auto",
        transform: "translate3d(0, 0, 0)",
      });
    };

    let frameId = null;

    const scheduleUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updatePosition();
      });
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(heroAnchor);
    resizeObserver.observe(heroSection);

    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(heroAnchor, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isHomePage]);

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
