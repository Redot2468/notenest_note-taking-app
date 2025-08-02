import { ChildrenType } from "@/app/_utils/types";

export default function Layout({ children }: ChildrenType) {
  return (
    <div className="flex h-fit w-full flex-grow border-2 border-red-600">
      {/* note lists (mobile - hidden, desktop - block) */}
      <aside className="hidden lg:block">note list will be here ()</aside>

      {/* notes */}
      <div className="flex w-full flex-grow flex-col">
        <main className="flex flex-grow border-8 border-blue-700">
          {children}
        </main>
      </div>
    </div>
  );
}
