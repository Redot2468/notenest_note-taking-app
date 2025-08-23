import { ChildrenType } from "@/app/_utils/types";
import NoteListDesktop from "@/src/app/_components/all-notes/NoteListDesktop";
import { Suspense } from "react";

export default function Layout({ children }: ChildrenType) {
  return (
    <div className="flex h-fit w-full flex-grow border-2 border-red-600">
      {/* note lists (mobile - hidden, desktop - block) */}
      <aside className="hidden border-r border-neutral-200 lg:block lg:w-[25%] xl:w-[25%]">
        <Suspense fallback={<div>Loading...</div>}>
          <NoteListDesktop />
        </Suspense>
      </aside>

      {/* notes */}
      <div className="flex w-full flex-grow flex-col lg:w-[70%]">
        <main className="flex flex-grow border-8 border-blue-700">
          {children}
        </main>
      </div>
    </div>
  );
}
