import visit from 'unist-util-visit';

const regex = /!(youtube|twitter|codesandbox)\[(.*?)\]/;

const embedTypeRegex = /^!(youtube|twitter|codesandbox)$/;

export default function embedPlugin() {
  console.log('embed');
  function transformer(tree: any, file: any) {
    function visitor(node: any) {
      const { children }: { children: any[] } = node;
      if (children.length < 2) return;
      const index = children.findIndex(childNode => {
        return childNode.value.match(embedTypeRegex);
      });
      if (index === -1) return;
      const childNode = children[index];
      const siblingNode = children[index + 1];
      if (!siblingNode || siblingNode.type !== 'linkReference') return;
      const { label } = siblingNode;
      const match = embedTypeRegex.exec(children[index].value);
      if (!match) return;
      const type = match[1];

      console.log(type, label);

      childNode.type = 'html';
      childNode.value = `<iframe class="youtube" src="https://www.youtube.com/embed/${label}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      children.splice(index + 1, 1);

      // const match = regex.exec(node.value);
      // console.log(node.value);
      // console.log(match);
    }
    console.log(tree);

    visit(tree, 'paragraph', visitor);
  }

  return transformer;
}
