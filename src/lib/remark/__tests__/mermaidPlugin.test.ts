import remark from 'remark';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import stringify from 'rehype-stringify';
import mermaidPlugin from '../mermaidPlugin';

function processMarkdown(md: string): string {
  return remark()
    .use(remarkParse)
    .use(mermaidPlugin)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(stringify)
    .processSync(md)
    .toString();
}

describe('mermaidPlugin', () => {
  it('mermaid 코드 블록을 mermaid-block div로 변환한다', () => {
    const md = '```mermaid\ngraph TD;\n  A-->B;\n```';
    const html = processMarkdown(md);
    expect(html).toContain('class="mermaid-block"');
    expect(html).toContain('class="mermaid"');
    expect(html).toContain('graph TD;');
    expect(html).toContain('A-->B;');
  });

  it('mermaid가 아닌 코드 블록은 변환하지 않는다', () => {
    const md = '```javascript\nconsole.log("hello");\n```';
    const html = processMarkdown(md);
    expect(html).not.toContain('mermaid-block');
    expect(html).toContain('console.log');
  });

  it('언어 지정 없는 코드 블록은 변환하지 않는다', () => {
    const md = '```\nplain code\n```';
    const html = processMarkdown(md);
    expect(html).not.toContain('mermaid-block');
    expect(html).toContain('plain code');
  });

  it('다양한 mermaid 다이어그램 타입을 지원한다', () => {
    const diagrams = [
      'sequenceDiagram\n  Alice->>Bob: Hello',
      'classDiagram\n  Animal <|-- Duck',
      'pie title Pets\n  "Dogs" : 386\n  "Cats" : 85',
      'flowchart LR\n  A --> B',
      'erDiagram\n  CUSTOMER ||--o{ ORDER : places',
      'gantt\n  title A Gantt\n  section Section\n  A task :a1, 2024-01-01, 30d',
      'stateDiagram-v2\n  [*] --> Active',
      'gitGraph\n  commit\n  branch develop',
    ];
    diagrams.forEach(diagram => {
      const md = `\`\`\`mermaid\n${diagram}\n\`\`\``;
      const html = processMarkdown(md);
      expect(html).toContain('class="mermaid"');
    });
  });

  it('mermaid 블록과 일반 코드 블록이 함께 있을 때 각각 올바르게 처리된다', () => {
    const md = [
      '```mermaid',
      'graph TD;',
      '  A-->B;',
      '```',
      '',
      '```javascript',
      'const x = 1;',
      '```',
    ].join('\n');
    const html = processMarkdown(md);
    expect(html).toContain('class="mermaid"');
    expect(html).toContain('const x = 1;');
  });
});
