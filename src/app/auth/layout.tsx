import { ChildrenType } from "@/app/_utils/types";
import React from "react";

export default function Layout({ children }: ChildrenType) {
  return (
    <div>
      {/* auth block */}
      <div>
        {/* app logo in header */}
        <header></header>

        {/* Rest of the auth content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
