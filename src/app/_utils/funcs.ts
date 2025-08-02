export function formatDate(noteDate: Date) {
  return new Intl.DateTimeFormat("en-UK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(noteDate);
}
