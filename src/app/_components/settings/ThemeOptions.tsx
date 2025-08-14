"use client";

import { useTheme } from "@/src/app/_hooks/settings/useTheme";
import { updateThemeAction } from "@/src/app/_lib/actions/settings/theme";
import { THEMEOPTIONS } from "@/src/app/_utils/constants";
import { Theme } from "@/src/app/_utils/types";
import Image from "next/image";

export default function ThemeOptions() {
  const { currentTheme, setCurrentTheme } = useTheme();

  return (
    <div className="space-y-4">
      {THEMEOPTIONS?.map((theme) => (
        <div
          className={`radius-12 flex cursor-pointer items-center justify-between gap-4 border border-neutral-200 p-4 transition-all hover:bg-neutral-100 ${currentTheme === theme?.mode ? "bg-neutral-100" : "bg-white"} `}
          key={theme?.mode}
          onClick={() => {
            updateThemeAction(theme?.mode as Theme);
            setCurrentTheme(theme?.mode);
          }}
        >
          {" "}
          <div className="flex items-center gap-4">
            <div className="radius-12 flex size-10 items-center justify-center border border-neutral-200 bg-white">
              <Image
                src={theme?.icon}
                alt="moon icon"
                quality={100}
                priority={true}
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-preset-4 text-neutral-950 capitalize">
                {theme?.themeMode}
              </p>
              <p className="text-preset-6 text-neutral-700">
                {theme?.themeText}
              </p>
            </div>
          </div>
          {currentTheme === theme?.mode ? (
            <div className="size-[9px] rounded-full border border-neutral-200 ring-4 ring-blue-500" />
          ) : (
            <div className="size-4 rounded-full border border-neutral-200" />
          )}
        </div>
      ))}
    </div>
  );
}
