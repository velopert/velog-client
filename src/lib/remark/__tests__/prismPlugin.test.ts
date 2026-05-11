import remark from 'remark';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import stringify from 'rehype-stringify';
import prismPlugin from '../prismPlugin';

function processMarkdown(md: string): string {
  return remark()
    .use(remarkParse)
    .use(prismPlugin)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(stringify)
    .processSync(md)
    .toString();
}

describe('prismPlugin', () => {
  it('mermaid 코드 블록을 Prism으로 처리하지 않는다', () => {
    const md = '```mermaid\ngraph TD;\n  A-->B;\n```';
    const html = processMarkdown(md);
    // Prism이 처리했다면 <span class="token ..."> 토큰이 생성됨
    expect(html).not.toContain('class="token');
    // 원본 텍스트가 그대로 유지되어야 함
    expect(html).toContain('graph TD;');
  });

  it('javascript 코드 블록은 정상적으로 하이라이팅한다', () => {
    const md = '```javascript\nconst x = 1;\n```';
    const html = processMarkdown(md);
    expect(html).toContain('language-javascript');
  });

  it('언어 지정 없는 코드 블록도 처리한다', () => {
    const md = '```\nplain text\n```';
    const html = processMarkdown(md);
    expect(html).toContain('<pre>');
  });
});
