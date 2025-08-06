import SearchForm from "@/src/app/_components/search/SearchForm";
import SearchNoteList from "@/src/app/_components/search/SearchNoteList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = await searchParams;

  return (
    <div className="w-full space-y-4 px-4 py-5">
      <h1 className="text-preset-1 text-neutral-950">Search</h1>
      <SearchForm query={query?.q} />

      {query?.q && (
        <p className="text-preset-5 text-neutral-700">
          All notes matching{" "}
          <span className="text-neutral-900">”{query?.q}”</span> are displayed
          below.
        </p>
      )}

      <Suspense fallback={<div>Loading...</div>} key={query?.q}>
        <SearchNoteList query={query?.q} />
      </Suspense>
    </div>
  );
}

// start fetching the note based on the search bar
