import { getAuthSession } from "@/app/_utils/getSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Notes",
};

export default async function Page() {
  const session = await getAuthSession();
  return (
    <div>
      {JSON.stringify(session)}
      {/* mobile - desktop (use the list in the layout) */}
      <div>list of notes (mobile)</div>

      {/* desktop */}
      <div>first Note</div>
    </div>
  );
}
