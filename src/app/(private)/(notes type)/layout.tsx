import { ChildrenType } from "@/app/_utils/types";
import React from "react";

export default function Layout({ children }: ChildrenType) {
  return (
    <div>
      {/* note lists (mobile - hidden, desktop - block) */}
      <aside className="lg:block">note list ()</aside>

      {/* notes */}
      <main>{children}</main>
    </div>
  );
}
