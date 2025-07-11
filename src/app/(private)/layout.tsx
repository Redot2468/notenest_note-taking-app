import { ChildrenType } from "@/app/_utils/types";
import React from "react";

export default function Layout({ children }: ChildrenType) {
  return (
    <div>
      {/* sidebar */}
      <aside></aside>

      <div>
        {/* navbar */}
        <header>
          <nav></nav>
        </header>

        {/* main content - notes, settings e.t.c */}
        <main>{children}</main>
      </div>
    </div>
  );
}
