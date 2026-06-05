import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Disable smooth scroll on mobile devices to maintain high-performance native touch dynamics
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Butter-smooth exponential deceleration
      gestureOrientation: "vertical",
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Register animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Global listener for anchor links to handle smooth scrolling transitions programmatically
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const element = document.querySelector(anchor.hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, {
            offset: -70, // Align perfectly below floating navigation capsule
            duration: 1.6,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}
