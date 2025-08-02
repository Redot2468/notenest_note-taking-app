import { hasContent } from "@/src/app/_utils/htmlContent";
import { NoteFormStateType, NoteFromDbType } from "@/src/app/_utils/types";
import { useEffect, useState } from "react";

const STORAGE_KEY = "notesDetails";

export function useNoteForm(noteFromDb: NoteFromDbType) {
  const noteDetailsFromLocalStorage = localStorage.getItem(STORAGE_KEY);
  const noteDataFromLocalStorage: NoteFormStateType =
    noteDetailsFromLocalStorage && JSON.parse(noteDetailsFromLocalStorage);

  const [noteFormData, setNoteFormData] = useState<NoteFormStateType>({
    noteContent:
      noteDataFromLocalStorage?.noteContent || noteFromDb?.content || "",
    title: noteDataFromLocalStorage?.title || noteFromDb?.title || "",
    tags: noteDataFromLocalStorage?.tags || noteFromDb?.tags?.join(", ") || "",
  });

  // I did this inorder to check if there are any content within the html tag in the content form, because the empty form still returns an html tag.
  const thereIsNoteContent = hasContent(noteFormData?.noteContent);
  const theNoteFormsAreEmpty =
    !thereIsNoteContent && !noteFormData?.tags && !noteFormData?.title;
  const updateIsDisabled =
    noteFromDb?.title === noteFormData?.title &&
    noteFromDb?.tags?.join(", ") === noteFormData?.tags &&
    noteFromDb?.content === noteFormData?.noteContent;

  useEffect(() => {
    // only store in local storage if it's a new note. Stored notes will come from db.
    localStorage.setItem("noteDetails", JSON.stringify(noteFormData));
  }, [noteFormData]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("noteDetails");
    };
  }, []);

  return {
    noteFormData,
    setNoteFormData,
    theNoteFormsAreEmpty,
    thereIsNoteContent,
    updateIsDisabled,
  };
}
