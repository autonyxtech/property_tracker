"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (time) => 1 - (1 - time) ** 4,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      anchors: true,
    });
    const syncScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", syncScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      lenis.off("scroll", syncScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
