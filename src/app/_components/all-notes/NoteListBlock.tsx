"use client";

import NoteCard from "@/src/app/_components/all-notes/NoteCard";
import { NoteFromDbType } from "@/src/app/_utils/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NoteListBlock({
  notes,
  archivedNotes,
}: {
  notes: NoteFromDbType[];
  archivedNotes: NoteFromDbType[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const userNotes = pathname.startsWith("/notes") ? notes : archivedNotes;

  // effect for displaying the firstnote, when you visit the /notes route

  useEffect(() => {
    const firstNoteId = userNotes?.at(0)?.id;

    function onResizeWindow() {
      console.log(window.innerWidth, userNotes?.length, userNotes);
      if (firstNoteId) {
        if (window.innerWidth >= 1024 && pathname === "/notes") {
          router.replace(`/notes/${firstNoteId}`);
        } else if (window.innerWidth >= 1024 && pathname === "/archived") {
          router.replace(`/archived/${firstNoteId}`);
        }
      } else if (!firstNoteId && pathname !== "/notes/new") {
        if (pathname.startsWith("/notes")) {
          router.replace("/notes");
        } else if (pathname.startsWith("/archived")) {
          router.replace("/archived");
        }
      }
    }

    if (firstNoteId) {
      if (window.innerWidth >= 1024 && pathname === "/notes") {
        router.replace(`/notes/${firstNoteId}`);
      } else if (window.innerWidth >= 1024 && pathname === "/archived") {
        router.replace(`/archived/${firstNoteId}`);
      }
    } else if (!firstNoteId && pathname !== "/notes/new") {
      if (pathname.startsWith("/notes")) {
        router.replace("/notes");
      } else if (pathname.startsWith("/archived")) {
        router.replace("/archived");
      }
    }

    window.addEventListener("resize", onResizeWindow);

    return () => window.addEventListener("resize", onResizeWindow);
  }, [userNotes, pathname, router]);

  if (!userNotes?.length) {
    return (
      !userNotes?.length && (
        <div className="radius-8 text-preset-5 mt-4 w-full border border-neutral-200 bg-neutral-100 p-2 text-neutral-950">
          <p>
            You don&apos;t have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        </div>
      )
    );
  }

  return (
    <div className="border">
      {/* note list card */}
      {userNotes?.map((note, arrIndex, arr) => (
        <Link
          key={note?.id}
          href={`${pathname.startsWith("/notes") ? `/notes/${note?.id}` : `/archived/${note?.id}`}`}
        >
          <NoteCard note={note} />
          {arrIndex !== arr.length - 1 && (
            <div className="radius-20 h-[1px] bg-neutral-200" />
          )}
        </Link>
      ))}
    </div>
  );
}
