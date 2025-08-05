import TagsList from "@/src/app/_components/tags/TagsList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tags",
};

export default function Page() {
  return (
    <div className="w-full space-y-4 px-4 py-5">
      <h1 className="text-preset-1 text-neutral-950 capitalize">tags</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <TagsList />
      </Suspense>
    </div>
  );
}

// look for how to get all the tags in the data
