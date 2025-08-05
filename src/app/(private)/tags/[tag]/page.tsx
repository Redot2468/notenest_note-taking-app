import BackButton from "@/src/app/_components/reusables/BackButton";
import TagNotesList from "@/src/app/_components/tags/TagNoteList";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const urlParam = await params;
  const tag = urlParam?.tag?.replace("%20", " ");

  return (
    <div className="w-full px-4 py-5">
      <BackButton />

      <div className="mt-5 space-y-4">
        <h1 className="text-preset-1 text-neutral-600 capitalize">
          notes tagged: <span className="text-neutral-950">{tag}</span>
        </h1>

        <p className="text-preset-5 text-neutral-700">
          All notes with the ”{tag}” tag are shown here.
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>} key={tag}>
        <TagNotesList tag={tag} />
      </Suspense>
    </div>
  );
}
