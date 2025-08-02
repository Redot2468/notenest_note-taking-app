import NoteLists from "@/app/_components/all-notes/NoteLists";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Notes",
};

export default async function Page() {
  return (
    <div className="flex-grow overflow-hidden border-4 border-amber-600">
      {/* mobile - desktop (use the list in the layout) */}
      <div className="lg:hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <NoteLists />
        </Suspense>
      </div>
      {/* desktop */}
      <div className="hidden lg:block">
        first Note
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam neque
          nulla omnis, nisi voluptatem officiis repellat voluptatum animi minus
          ab.
        </p>
      </div>
    </div>
  );
}
