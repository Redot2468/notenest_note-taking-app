import { getSettings } from "@/src/app/_lib/data-service/settings";
import { useAppDispatch, useAppSelector } from "@/src/app/_lib/redux/hooks";
import { getNotes, onUpdateFont } from "@/src/app/_lib/redux/notes/notes-slice";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useFont() {
  const [isClient, setIsClient] = useState(false);
  const { currentFont } = useAppSelector(getNotes);
  const dispatch = useAppDispatch();

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  // Hydration effect
  useEffect(() => {
    const localFont = localStorage.getItem("font");
    if (localFont) {
      dispatch(onUpdateFont(JSON.parse(localFont)));
    }
    setIsClient(true);
  }, [dispatch]);

  // Sync server data (only after hydration)
  useEffect(() => {
    if (!isClient || !settings?.font) return;

    dispatch(onUpdateFont(settings?.font));
    localStorage.setItem("font", JSON.stringify(settings.font));
  }, [dispatch, settings, isClient]);

  // Save to localStorage when font changes
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("font", JSON.stringify(currentFont));
  }, [currentFont, isClient]);

  return {
    currentFont,
    isHydrated: isClient,
  };
}
