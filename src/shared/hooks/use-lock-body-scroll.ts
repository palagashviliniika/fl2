"use client";

import { useEffect } from "react";

type UseLockBodyScrollOptions = {
  enabled?: boolean;
};

export function useLockBodyScroll({ enabled = true }: UseLockBodyScrollOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [enabled]);
}
