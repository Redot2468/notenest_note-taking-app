"use client";

import "@/components/tiptap-node/image-node/image-node.scss";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import EditorToolbar from "@/src/app/_components/all-notes/new-note/EditorToolbar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";

import "@/components/tiptap-node/image-node/image-node.scss";
import { ListKeymap } from "@tiptap/extension-list";

interface TiptapProps {
  content: string;
  onUpdateContent: (content: string) => void;
}

const lowlight = createLowlight(all);

export default function Tiptap({ content, onUpdateContent }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4 list-outside",
          },
        },

        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-neutral-200 pl-4",
          },
        },
      }),
      ListKeymap,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "justify",
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight.configure({ multicolor: true }),
      Image,
      TextStyle,
      FontSize,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content,
    editable: true,
    onUpdate: ({ editor }) => {
      onUpdateContent(editor.getHTML());
    },

    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-[420px]  rounded-md scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200 overflow-y-auto no-scrollbar focus:outline-none ",
      },
    },
  });

  if (!editor) {
    return;
  }

  return (
    <div className="relative flex w-full flex-grow flex-col space-y-4">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
