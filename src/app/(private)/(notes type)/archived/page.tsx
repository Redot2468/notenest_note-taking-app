import ArchiveNoteList from "@/src/app/_components/all-notes/archive-notes/ArchivedNoteList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Archived Notes",
};

export default function Page() {
  return (
    <div>
      {/* mobile - desktop (use the list in the layout) */}
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ArchiveNoteList />
        </Suspense>
      </div>

      {/* desktop */}
      {/* <div>first Note</div> */}
    </div>
  );
}
