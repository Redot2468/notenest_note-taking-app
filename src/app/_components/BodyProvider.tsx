"use client";

import { useFont } from "@/src/app/_hooks/settings/useFont";
import { inter, notoSerif, sourceCodePro } from "@/src/app/_styles/font";
import { ChildrenType } from "@/src/app/_utils/types";
import { useCallback, useEffect } from "react";

export default function BodyProvider({ children }: ChildrenType) {
  const { currentFont } = useFont();
  console.log(currentFont, "styless");

  const getFontClassName = useCallback(() => {
    switch (currentFont) {
      case "sans":
        return inter.className;
      case "serif":
        return notoSerif.className;
      case "mono":
        return sourceCodePro.className;
      default:
        return inter.className; // fallback
    }
  }, [currentFont]);

  useEffect(() => {
    document.body.classList.add(getFontClassName());

    return () => document.body.classList.remove(getFontClassName());
  }, [currentFont, getFontClassName]);

  return <>{children}</>;
}
