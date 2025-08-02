export function hasContent(html: string): boolean {
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Remove all whitespace-only nodes
  const text = temp.textContent?.trim();

  return !!text;
}
