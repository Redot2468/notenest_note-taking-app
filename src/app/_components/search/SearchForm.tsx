"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm({ query }: { query: string | undefined }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const onNoteSearch = useDebouncedCallback(handleNoteSearch, 300);

  function handleNoteSearch(searchQuery: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <form autoComplete="on">
      <div className="radius-8 flex items-center gap-2 border border-neutral-300 bg-neutral-50 px-4 py-3 md:py-4">
        <Search className="size-[18px] text-neutral-500" />
        <input
          type="text"
          name="noteSearch"
          id="noteSearch"
          defaultValue={query}
          autoComplete="noteSearch"
          aria-label="search for note"
          placeholder="Search for a note..."
          className="text-preset-5 w-full text-neutral-950 placeholder:italic focus:outline-none"
          onChange={(e) => onNoteSearch(e.target.value)}
        />
      </div>
    </form>
  );
}
