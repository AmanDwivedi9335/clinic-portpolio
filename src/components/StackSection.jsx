"use client";

import { useEffect, useRef } from "react";

/**
 * StackSection
 * - Creates a 200vh scroll wrapper with a 100vh sticky viewport.
 * - Calculates scroll progress (0 → 1) via getBoundingClientRect().
 * - Animates translateY from 18vh → 0 using cubic ease-out.
 * - Uses requestAnimationFrame for smooth, GPU-accelerated transforms.
 */
export default function StackSection({
  children,
  className = "",
  backgroundClassName = "",
  zIndex = 1,
}) {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const rafRef = useRef(null);

  const updatePosition = () => {
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!wrapper || !panel) return;

    const rect = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 0;

    // Progress: 0 when section enters from bottom, 1 when it reaches the top.
    const rawProgress = (viewportHeight - rect.top) / viewportHeight;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    // Cubic ease-out for a smooth stacked reveal.
    const eased = 1 - Math.pow(1 - clampedProgress, 3);
    const translateY = (1 - eased) * 18;

    panel.style.transform = `translate3d(0, ${translateY}vh, 0)`;
  };

  const requestTick = () => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updatePosition();
    });
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className={`relative h-[200vh] ${className}`}
      style={{ zIndex }}
    >
      <div
        ref={panelRef}
        className={`sticky top-0 h-screen w-full will-change-transform ${backgroundClassName}`}
        style={{ transform: "translate3d(0, 18vh, 0)" }}
      >
        <div className="h-full w-full">{children}</div>
      </div>
    </section>
  );
}
