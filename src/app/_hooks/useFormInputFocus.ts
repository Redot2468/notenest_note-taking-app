import { useEffect, useRef, useState } from "react";

export function useFormInputFocus() {
  const [inputFocus, setInputFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const inputEl = inputRef?.current;

    if (!inputEl) return;

    function inputOnFocus() {
      setInputFocus(true);
    }
    function inputOnBlur() {
      setInputFocus(false);
    }

    inputEl.addEventListener("focus", inputOnFocus);
    inputEl.addEventListener("blur", inputOnBlur);

    return () => {
      inputEl.removeEventListener("focus", inputOnFocus);
      inputEl.removeEventListener("blur", inputOnBlur);
    };
  }, []);

  return { inputFocus, inputRef };
}
