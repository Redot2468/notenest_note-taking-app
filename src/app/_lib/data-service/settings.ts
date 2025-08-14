import { Settings } from "@/src/app/_utils/types";
import { cache } from "react";

export const getSettings = cache(async function () {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/settings`);

    const data: Settings = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
  }
});
