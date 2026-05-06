const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

function decodeEntities(input: string): string {
  return input.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (match, body) => {
    if (body.startsWith('#x') || body.startsWith('#X')) {
      const code = parseInt(body.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (body.startsWith('#')) {
      const code = parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named ?? match;
  });
}

function stripDanglingEntity(input: string): string {
  return input.replace(/&(#x?[0-9a-fA-F]*|[a-zA-Z]*)$/, '');
}

function stripDanglingTag(input: string): string {
  const lastOpen = input.lastIndexOf('<');
  const lastClose = input.lastIndexOf('>');
  if (lastOpen > lastClose) {
    return input.slice(0, lastOpen);
  }
  return input;
}

export function sanitizeDescription(raw: string, limit = 150): string {
  if (!raw) return '';
  const withoutTags = raw.replace(/<[^>]*>/g, '');
  const decoded = decodeEntities(withoutTags);
  const collapsed = decoded.replace(/\s+/g, ' ').trim();
  if (collapsed.length <= limit) return collapsed;
  const sliced = collapsed.slice(0, limit);
  return stripDanglingTag(stripDanglingEntity(sliced));
}

export default sanitizeDescription;
