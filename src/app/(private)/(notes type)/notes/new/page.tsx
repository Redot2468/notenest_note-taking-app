import NewNotes from "@/app/_components/all-notes/new-note/NewNotes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Note",
};

export default function Page() {
  return (
    <div className="w-full space-y-3 border-4 border-green-800 px-4 py-5">
      <NewNotes />
    </div>
  );
}
