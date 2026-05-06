import sanitizeDescription from '../sanitizeDescription';

describe('sanitizeDescription', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeDescription('')).toBe('');
  });

  it('strips HTML tags', () => {
    expect(sanitizeDescription('<div>hello</div>')).toBe('hello');
  });

  it('strips HTML tag with attributes', () => {
    expect(
      sanitizeDescription('<div style="color: red;">hello world</div>'),
    ).toBe('hello world');
  });

  it('decodes common HTML entities', () => {
    expect(sanitizeDescription('1 &lt; 2 &amp; 3 &gt; 0')).toBe('1 < 2 & 3 > 0');
  });

  it('decodes hex numeric entities (e.g. &#x3A;)', () => {
    expect(sanitizeDescription('key&#x3A;value')).toBe('key:value');
  });

  it('decodes decimal numeric entities', () => {
    expect(sanitizeDescription('A&#65;B')).toBe('AAB');
  });

  it('collapses whitespace and trims', () => {
    expect(sanitizeDescription('  hello\n\nworld   foo  ')).toBe(
      'hello world foo',
    );
  });

  it('does not produce dangling tag fragments when truncating', () => {
    const raw = 'a'.repeat(148) + '<b>bold</b>';
    const result = sanitizeDescription(raw);
    expect(result).not.toMatch(/<[^>]*$/);
    expect(result.length).toBeLessThanOrEqual(150);
  });

  it('does not produce dangling entity fragments when truncating', () => {
    // pre tail = 148 "a"s, then "&lt;xyz" — after decoding "<xyz" would slip in
    // but we want to test that if something like "&l" survives it gets stripped.
    const raw = 'a'.repeat(148) + '&lt;end';
    const result = sanitizeDescription(raw);
    // after decoding, should be 'a'.repeat(148) + '<end', sliced to 150 = a*148 + '<e'
    // then dangling-tag strip removes the trailing '<e'
    expect(result.endsWith('&l')).toBe(false);
    expect(result).not.toMatch(/<[^>]*$/);
  });

  it('reproduces the reported bug pattern: `">~<` does not leak', () => {
    // Simulates a description starting with a malformed tag fragment
    const raw = '<div style="color:red">~</div> real description text here';
    const result = sanitizeDescription(raw);
    expect(result).toBe('~ real description text here');
    expect(result).not.toContain('">');
    expect(result).not.toContain('<');
  });

  it('respects custom limit', () => {
    const raw = 'abcdefghij';
    expect(sanitizeDescription(raw, 5)).toBe('abcde');
  });

  it('leaves a clean short description unchanged', () => {
    const raw = '이것은 깨끗한 글 요약입니다.';
    expect(sanitizeDescription(raw)).toBe(raw);
  });
});
