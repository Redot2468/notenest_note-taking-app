import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Archived Notes",
};

export default function Page() {
  return (
    <div>
      {/* mobile - desktop (use the list in the layout) */}
      <div>list of notes (mobile)</div>

      {/* desktop */}
      <div>first Note</div>
    </div>
  );
}
