import visit from 'unist-util-visit';

export default function imgCaptionPlugin() {
  function transformer(tree: any) {
    const visitor = (node: any) => {
      try {
        const figcaptionEle =
          node && node.alt ? `<figcaption>${node.alt}</figcaption>` : '';

        node.type = 'html';
        node.value = `<figure><img src="${node.url}"/>${figcaptionEle}</figure>`;
      } catch (err) {
        console.log(err);
      }
    };

    visit(tree, 'image', visitor);
  }

  return transformer;
}
