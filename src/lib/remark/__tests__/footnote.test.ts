import remark from 'remark';
import remarkParse from 'remark-parse';
import breaks from 'remark-breaks';
import footnotes from 'remark-footnotes';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import stringify from 'rehype-stringify';

function processMarkdown(md: string): string {
  return remark()
    .use(remarkParse)
    .use(breaks)
    .use(footnotes, { inlineNotes: true })
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(stringify)
    .processSync(md)
    .toString();
}

describe('remark-footnotes', () => {
  it('각주 정의와 참조를 HTML로 변환한다', () => {
    const md = [
      'Here is a footnote reference[^1].',
      '',
      '[^1]: This is the footnote content.',
    ].join('\n');
    const html = processMarkdown(md);
    // 본문에 각주 참조 링크
    expect(html).toContain('sup');
    expect(html).toContain('footnote-ref');
    // 하단에 각주 내용
    expect(html).toContain('This is the footnote content.');
  });

  it('여러 개의 각주를 처리한다', () => {
    const md = [
      'First[^1] and second[^2].',
      '',
      '[^1]: First note.',
      '[^2]: Second note.',
    ].join('\n');
    const html = processMarkdown(md);
    expect(html).toContain('First note.');
    expect(html).toContain('Second note.');
  });

  it('인라인 각주를 지원한다', () => {
    const md = 'Here is an inline note^[This is inline].';
    const html = processMarkdown(md);
    expect(html).toContain('This is inline');
  });

  it('각주가 없는 마크다운은 영향받지 않는다', () => {
    const md = '# Hello\n\nNormal paragraph.';
    const html = processMarkdown(md);
    expect(html).toContain('<h1>Hello</h1>');
    expect(html).toContain('Normal paragraph.');
    expect(html).not.toContain('footnote');
  });

  it('각주 내에 마크다운 서식을 지원한다', () => {
    const md = [
      'Text with note[^1].',
      '',
      '[^1]: Note with **bold** and `code`.',
    ].join('\n');
    const html = processMarkdown(md);
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<code>code</code>');
  });
});
