/* eslint-disable */
import visit from 'unist-util-visit';
import Prism from 'prismjs';

import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-markup-templating.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-go.min';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-clike.min';
import 'prismjs/components/prism-csharp.min';
import 'prismjs/components/prism-graphql.min';
import 'prismjs/components/prism-tsx.min';
import 'prismjs/components/prism-php.min';
import 'prismjs/components/prism-aspnet.min';
import 'prismjs/components/prism-sql.min';
import 'prismjs/components/prism-swift.min';
import 'prismjs/components/prism-kotlin.min';
import 'prismjs/components/prism-erlang.min';
import 'prismjs/components/prism-elixir.min';

export default function attacher({ include, exclude } = {}) {
  function visitor(node) {
    let { lang, data } = node;

    // if (
    //   !lang ||
    //   (include && include.indexOf(lang) === -1) ||
    //   (exclude && exclude.indexOf(lang) !== -1)
    // ) {
    //   return;
    // }

    if (!data) {
      data = {};
      node.data = data;
    }

    if (!data.hProperties) {
      data.hProperties = {};
    }

    window.prism = Prism;

    const highlighted = Prism.highlight(
      node.value,
      Prism.languages[lang] || Prism.languages.markup,
    );

    node.type = 'html';
    node.value = `<pre><code class="language-${lang}">${highlighted}</code></pre>`;
    // console.log(data);
    // data.hChildren = '<div>so what?</div>';
    // data.hChildren =
    // data.hChildren = low.highlight(lang, node.value).value;
    // data.hProperties.className = [
    //   'hljs',
    //   ...(data.hProperties.className || []),
    //   'language-' + lang,
    // ];
  }
  return ast => visit(ast, 'code', visitor);
}
