import { getTagsList } from "@/src/app/_lib/data-service/tags";
import { getUniqueTagsList } from "@/src/app/_utils/funcs";
import { Tag } from "lucide-react";
import Link from "next/link";

export default async function TagsList() {
  const tagsFromDb = await getTagsList();
  const tagsList = getUniqueTagsList(tagsFromDb);

  return (
    <div className="w-full">
      {tagsList.map((tag, idx, arr) => (
        <Link href={`/tags/${tag?.trim()}`} key={tag}>
          <div>
            <div className="flex items-center gap-2 py-3">
              <Tag className="size-[18px]" />
              <p className="text-preset-4 text-neutral-700 capitalize">{tag}</p>
            </div>

            {idx !== arr.length - 1 && (
              <div className="h-[1px] bg-neutral-200" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
