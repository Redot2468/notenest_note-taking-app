type TagFromDb = {
  tags: string[] | null;
}[];

export function getUniqueTagsList(tagsFromDb: TagFromDb) {
  const tagsList = tagsFromDb
    ?.map((tag) => Object.values(tag))
    .flat(2)
    .filter((tag) => tag);

  const uniqArray = Array.from(new Set(tagsList));

  return uniqArray;
}

export function formatDate(noteDate: Date) {
  return new Intl.DateTimeFormat("en-UK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(noteDate);
}
