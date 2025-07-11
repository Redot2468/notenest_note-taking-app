import { inter } from "@/app/_styles/font";
import { ChildrenType } from "@/app/_utils/types";
import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - NoteNest",
    default: "Home - NoteNest",
  },
  description:
    "Your all in one notes, where you can note down thoughts, conclusions from research and readings.",
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
