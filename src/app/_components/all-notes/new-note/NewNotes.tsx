import NewNoteHeader from "@/app/_components/all-notes/new-note/NewNoteHeader";
import NewNoteForm from "@/src/app/_components/all-notes/new-note/NewNoteForm";

export default function NewNotes() {
  return (
    <form action="" autoComplete="on" className="">
      {/* new tab header */}
      <NewNoteHeader />
      <NewNoteForm />
    </form>
  );
}
