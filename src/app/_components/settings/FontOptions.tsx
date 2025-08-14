"use client";

import { useFont } from "@/src/app/_hooks/settings/useFont";
import { updateFontAction } from "@/src/app/_lib/actions/settings/font";
import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import { onUpdateFont } from "@/src/app/_lib/redux/notes/notes-slice";
import { FONTOPTIONS } from "@/src/app/_utils/constants";
import { Font } from "@/src/app/_utils/types";
import Image from "next/image";

export default function FontOptions() {
  const { currentFont } = useFont();
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-4">
      {FONTOPTIONS?.map((fontOption) => (
        <div
          className={`radius-12 flex cursor-pointer items-center justify-between gap-4 border border-neutral-200 p-4 transition-all hover:bg-neutral-100 ${currentFont === fontOption?.font ? "bg-neutral-100" : "bg-white"} `}
          key={fontOption?.font}
          onClick={() => {
            updateFontAction(fontOption?.font as Font);
            dispatch(onUpdateFont(fontOption?.font));
          }}
        >
          {" "}
          <div className="flex items-center gap-4">
            <div className="radius-12 flex size-10 items-center justify-center border border-neutral-200 bg-white">
              <Image
                src={fontOption?.icon}
                alt="moon icon"
                quality={100}
                priority={true}
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-preset-4 text-neutral-950 capitalize">
                {fontOption?.fontType}
              </p>
              <p className="text-preset-6 text-neutral-700">
                {fontOption?.fontDesc}
              </p>
            </div>
          </div>
          {currentFont === fontOption?.font ? (
            <div className="size-[9px] rounded-full border border-neutral-200 ring-4 ring-blue-500" />
          ) : (
            <div className="size-4 rounded-full border border-neutral-200" />
          )}
        </div>
      ))}
    </div>
  );
}
