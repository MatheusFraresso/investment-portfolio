"use client";
import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 768;

interface IScreenProperties {
  isMobile: boolean;
  width: number;
  height: number;
}

function getScreenProperties() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= MOBILE_BREAKPOINT,
  };
}
export default function useScreen() {
  if (typeof window === "undefined") return;

  const [screenProperties, setScreenProperties] = useState<IScreenProperties>(
    getScreenProperties()
  );

  useEffect(() => {
    const onResize = getScreenProperties;

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return screenProperties;
}
