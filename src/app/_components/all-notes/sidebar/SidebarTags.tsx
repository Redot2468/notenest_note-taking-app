import tagIcon from "@/public/icons/icon-tag.svg";
import { getTagsList } from "@/src/app/_lib/data-service/tags";
import { getUniqueTagsList } from "@/src/app/_utils/funcs";
import Image from "next/image";

export default async function SidebarTags() {
  const tagsFromDb = await getTagsList();

  const tagsList = getUniqueTagsList(tagsFromDb);

  return (
    <div className="mt-3 flex flex-col gap-2">
      <p className="text-preset-4 px-3 text-neutral-500 capitalize">tags</p>

      {/* tags */}
      <div>
        {tagsList?.map((tag, idx) => (
          <button key={idx} className="flex items-center gap-2 px-3 py-2.5">
            <Image src={tagIcon} alt="tag" quality={100} priority />

            <span className="text-preset-4 text-neutral-700 capitalize">
              {tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
