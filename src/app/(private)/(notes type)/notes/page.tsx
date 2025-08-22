import NoteLists from "@/app/_components/all-notes/NoteLists";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Notes",
};

export default async function Page() {
  return (
    <div className="h-[80vh] flex-grow overflow-hidden">
      {/* mobile - desktop (use the list in the layout) */}
      <div className="lg:hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <NoteLists />
        </Suspense>
      </div>
      {/* desktop */}
      <div className="hidden lg:block"></div>
    </div>
  );
}
