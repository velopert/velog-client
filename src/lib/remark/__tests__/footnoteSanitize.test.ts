import remark from 'remark';
import remarkParse from 'remark-parse';
import breaks from 'remark-breaks';
import footnotes from 'remark-footnotes';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import stringify from 'rehype-stringify';
import sanitize from 'sanitize-html';
import katexWhitelist from '../../katexWhitelist';

function processAndSanitize(md: string): string {
  const html = remark()
    .use(remarkParse)
    .use(breaks)
    .use(footnotes, { inlineNotes: true })
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(stringify)
    .processSync(md)
    .toString();

  return sanitize(html, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li',
      'b', 'i', 'strong', 'em', 'strike', 'code',
      'hr', 'br', 'div', 'table', 'thead', 'caption',
      'tbody', 'tr', 'th', 'td', 'pre', 'iframe',
      'span', 'img', 'del', 'input',
      'sup', 'section',
      ...katexWhitelist.tags,
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt', 'width', 'height'],
      iframe: ['src', 'allow', 'allowfullscreen', 'scrolling', 'class'],
      '*': ['class', 'id', 'aria-hidden'],
      span: ['style'],
      input: ['type'],
      ol: ['start'],
      ...katexWhitelist.attributes,
    },
  });
}

describe('footnote sanitize integration', () => {
  it('sanitize 후에도 각주 참조 링크가 보존된다', () => {
    const md = 'Text[^1].\n\n[^1]: Note content.';
    const html = processAndSanitize(md);
    expect(html).toContain('<sup');
    expect(html).toContain('footnote-ref');
    expect(html).toContain('href="#fn-1"');
  });

  it('sanitize 후에도 각주 내용이 보존된다', () => {
    const md = 'Text[^1].\n\n[^1]: Note content.';
    const html = processAndSanitize(md);
    expect(html).toContain('Note content.');
    expect(html).toContain('footnote-backref');
  });

  it('sanitize 후에도 footnotes div의 class가 보존된다', () => {
    const md = 'Text[^1].\n\n[^1]: Note content.';
    const html = processAndSanitize(md);
    expect(html).toContain('class="footnotes"');
  });

  it('XSS 시도가 포함된 각주는 살균된다', () => {
    const md = 'Text[^1].\n\n[^1]: <script>alert("xss")</script>Safe text.';
    const html = processAndSanitize(md);
    expect(html).not.toContain('<script>');
    expect(html).toContain('Safe text.');
  });
});
