import ArchiveNote from "@/src/app/_components/all-notes/archive-notes/ArchiveNote";

export function generateMetadata() {}

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const param = await params;

  return (
    <div>
      {/* note content - mobile and desktop */}
      <ArchiveNote noteId={param?.noteId} />
    </div>
  );
}
