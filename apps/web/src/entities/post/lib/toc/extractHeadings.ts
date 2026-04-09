export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    const text = rawText.replace(/[*]{1,2}(.+?)[*]{1,2}/g, '$1').replace(/`(.+?)`/g, '$1');
    let id = text
      .toLowerCase()
      .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
      .replace(/\s+/g, '-');

    if (/^\d/.test(id)) {
      id = `heading-${id}`;
    }

    headings.push({ id, text, level });
  }

  return headings;
}
