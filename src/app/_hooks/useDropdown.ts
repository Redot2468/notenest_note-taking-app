import { useEffect, useState } from "react";

export function useDropdown(parentEl: string) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onOpenDropdown = () => setIsDropdownOpen((cur) => !cur);

  useEffect(() => {
    function onBlurDropdown(e: MouseEvent) {
      const targetEl = e.target as HTMLElement;

      if (!targetEl.closest(parentEl)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("click", onBlurDropdown);

    return () => document.removeEventListener("click", onBlurDropdown);
  }, [parentEl]);

  return { isDropdownOpen, onOpenDropdown };
}
