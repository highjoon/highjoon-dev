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
    const text = match[2].trim();
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
