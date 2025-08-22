import MobileFooter from "@/app/_components/reusables/MobileFooter";
import NavBar from "@/app/_components/reusables/NavBar";
import NewNoteMobileBtn from "@/app/_components/reusables/NewNoteMobileBtn";
import { ChildrenType } from "@/app/_utils/types";
import Sidebar from "@/src/app/_components/all-notes/sidebar/Sidebar";
import SidebarTags from "@/src/app/_components/all-notes/sidebar/SidebarTags";
import { Suspense } from "react";

export default function Layout({ children }: ChildrenType) {
  return (
    <div className="flex h-[100dvh] border-2 border-purple-600">
      {/* sidebar */}
      <aside className="hidden border px-4 py-3 lg:block lg:w-[20%]">
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarTags />
        </Suspense>
      </aside>

      <div className="relative flex h-[100dvh] w-full flex-col border-2 lg:w-[80%]">
        {/* navbar */}
        <header>
          <NavBar />
        </header>

        {/* main content - notes, settings e.t.c */}
        <main className="scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-200 flex h-32 flex-grow overflow-y-scroll border-4">
          {children}
        </main>
        <MobileFooter />
        <NewNoteMobileBtn />
      </div>
    </div>
  );
}

//use optimistic for the creation of notes.
// Save note when you click on the "save note btn" and 'on going back to the previous page, save notes.'
