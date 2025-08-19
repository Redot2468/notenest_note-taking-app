import { getSettings } from "@/src/app/_lib/data-service/settings";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useTheme() {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  console.log(settings, "settingsss");

  const [currentTheme, setCurrentTheme] = useState("system");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setCurrentTheme(JSON.parse(localTheme));
    }
  }, []);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    const currentThemeFromLocalStorage =
      localStorageTheme && JSON.parse(localStorageTheme);

    if (settings?.theme !== currentThemeFromLocalStorage && settings?.theme) {
      console.log(settings?.theme);
      setCurrentTheme(settings?.theme);
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(currentTheme));

    const htmlElement = document.querySelector("html");

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    if (currentTheme === "system") {
      htmlElement?.classList.add(systemTheme);
    } else {
      htmlElement?.classList.add(currentTheme);
    }

    return () => {
      htmlElement?.classList.remove(systemTheme);
      htmlElement?.classList.remove(currentTheme);
    };
  }, [currentTheme, settings]);

  return { currentTheme, setCurrentTheme };
}

// start the change password
