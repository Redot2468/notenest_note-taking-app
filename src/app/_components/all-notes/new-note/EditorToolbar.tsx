import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import FontSize from "@/src/app/_components/all-notes/new-note/editor/FontSize";
import HeadingTool from "@/src/app/_components/all-notes/new-note/editor/HeadingTool";
import Toggle from "@/src/app/_components/all-notes/new-note/editor/Toggle";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  List,
  Strikethrough,
  TextQuote,
  Underline,
} from "lucide-react";

export default function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
  return (
    <div className="no-scrollbar flex w-full overflow-x-auto overflow-y-hidden">
      <div className="flex w-full items-center justify-between gap-4 border border-neutral-200 bg-white px-4 py-1 lg:w-fit">
        <HeadingTool editor={editor} />
        <FontSize editor={editor} />
        {/* bold */}
        <Toggle
          aria-label="Toggle bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </Toggle>
        {/* italic */}
        <Toggle
          aria-label="Toggle italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </Toggle>
        {/* block quote */}
        <Toggle
          aria-label="Toggle quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <TextQuote className="size-4" />
        </Toggle>
        {/* list */}
        <Toggle
          aria-label="Toggle list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle highlighter"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#e9d204" }).run()
          }
        >
          <Highlighter className="size-4" />
        </Toggle>
        <div className="h-6 border-r border-neutral-200" />
        {/* underline */}
        <Toggle
          aria-label="Toggle list"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="size-4" />
        </Toggle>
        {/* strike through */}
        <Toggle
          aria-label="Toggle strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="size-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle code block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="size-4" />
        </Toggle>
        <ImageUploadButton editor={editor} />

        {/* link
      <LinkToggle editor={editor} /> */}
        {/* image upload */}
        {/* <ImageUploadButton editor={editor} /> */}
        <div className="h-6 border-r border-neutral-200" />
        {/* alignments */}
        {/* left */}
        <Toggle
          aria-label="Toggle align"
          onClick={() => editor.chain().focus().toggleTextAlign("left").run()}
        >
          <AlignLeft className="size-4" />
        </Toggle>
        {/* center */}
        <Toggle
          aria-label="Toggle align"
          onClick={() => editor.chain().focus().toggleTextAlign("center").run()}
        >
          <AlignCenter className="size-4" />
        </Toggle>
        {/* right */}
        <Toggle
          aria-label="Toggle align"
          onClick={() => editor.chain().focus().toggleTextAlign("right").run()}
        >
          <AlignRight className="size-4" />
        </Toggle>
        {/* justify */}
        <Toggle
          aria-label="Toggle align"
          onClick={() =>
            editor.chain().focus().toggleTextAlign("justify").run()
          }
        >
          <AlignJustify className="size-4" />
        </Toggle>
      </div>
    </div>
  );
}
