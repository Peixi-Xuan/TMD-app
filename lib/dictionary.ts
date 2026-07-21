import raw from '../content/learning-module.json';

export type Figure = {
  placeholder: string;
  caption: string;
  status: string;
};

export type Entry = {
  id: string;
  number: string;
  title_zh: string;
  title_en: string | null;
  abbr: string | null;
  parent: string | null;
  level: number;
  aliases: string[];
  body_md: string;
  cross_refs: string[];
  figures: Figure[];
  todos: string[];
  content_status: string;
};

export const entries: Entry[] = (raw as any).entries;

export const entryMap: Record<string, Entry> = Object.fromEntries(
  entries.map((e) => [e.id, e])
);

export function getEntry(id: string): Entry | undefined {
  return entryMap[id];
}

export function getChildren(id: string): Entry[] {
  return entries.filter((e) => e.parent === id);
}

export function getTopLevel(): Entry[] {
  return entries.filter((e) => e.level === 1);
}

export function countDescendants(id: string): number {
  const children = getChildren(id);
  return children.reduce((sum, c) => sum + 1 + countDescendants(c.id), 0);
}

export function getBackRefs(id: string): Entry[] {
  return entries.filter((e) => e.id !== id && e.cross_refs?.includes(id));
}

function haystack(e: Entry): string {
  return [e.title_zh, e.title_en, e.abbr, ...(e.aliases || []), e.body_md]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function searchEntries(query: string): Entry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return entries
    .filter((e) => haystack(e).includes(q))
    .sort((a, b) => {
      const aTitle = a.title_zh.toLowerCase().includes(q) ? 0 : 1;
      const bTitle = b.title_zh.toLowerCase().includes(q) ? 0 : 1;
      if (aTitle !== bTitle) return aTitle - bTitle;
      return a.number.localeCompare(b.number, undefined, { numeric: true });
    });
}
