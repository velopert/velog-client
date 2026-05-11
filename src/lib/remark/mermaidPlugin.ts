import visit from 'unist-util-visit';

export default function mermaidPlugin() {
  function visitor(node: any) {
    const { lang, value } = node;
    if (lang !== 'mermaid') return;

    node.type = 'html';
    node.value = `<div class="mermaid-block"><pre class="mermaid">${value}</pre></div>`;
  }

  return (ast: any) => visit(ast, 'code', visitor);
}
