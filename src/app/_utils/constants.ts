import fontThemeIcon from "@/public/icons/icon-font.svg";
import lockIcon from "@/public/icons/icon-lock.svg";
import moonIcon from "@/public/icons/icon-moon.svg";

import monoIcon from "@/public/icons/icon-font-monospace.svg";
import sansIcon from "@/public/icons/icon-font-sans-serif.svg";
import serifIcon from "@/public/icons/icon-font-serif.svg";

import {
  default as colorThemeIcon,
  default as sunIcon,
} from "@/public/icons/icon-sun.svg";
import systemIcon from "@/public/icons/icon-system-theme.svg";
import { Notebook } from "lucide-react";

export const HEADINGS_LEVEL = [1, 2, 3];

export const DISCARD_MODAL_CONTENT = {
  modalIcon: Notebook,
  modalTitle: "Unsaved changes",
  modalDialogue: "You have unsaved changes. What would you like to do?",
};

export const SETTINGS = [
  { icon: colorThemeIcon, content: "color theme", href: "/settings/theme" },
  { icon: fontThemeIcon, content: "font theme", href: "/settings/font" },
  { icon: lockIcon, content: "change password", href: "/settings/password" },
];

export const THEMEOPTIONS = [
  {
    icon: sunIcon,
    themeMode: "light mode",
    themeText: "Pick a clean and classic light theme",
    mode: "light",
  },
  {
    icon: moonIcon,
    themeMode: "dark mode",
    themeText: "Select a sleek and modern dark theme.",
    mode: "dark",
  },
  {
    icon: systemIcon,
    themeMode: "System",
    themeText: "Adapts to your device's theme",
    mode: "system",
  },
];

export const FONTOPTIONS = [
  {
    icon: sansIcon,
    fontType: "Sans-serif",
    fontDesc: "Clean and modern, easy to read.",
    font: "sans",
  },
  {
    icon: serifIcon,
    fontType: "Serif",
    fontDesc: "Classic and elegant for a timeless feel.",
    font: "serif",
  },
  {
    icon: monoIcon,
    fontType: "Monospace",
    fontDesc: "Code-like, great for a technical vibe.",
    font: "mono",
  },
];

export const SYSTEMTHEME = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
