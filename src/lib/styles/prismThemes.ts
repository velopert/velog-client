import { css } from 'styled-components';

const prismThemes = {
  'atom-one-dark': css`
    pre {
      background: #313440;
    }
    /**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
    code[class*='language-'],
    pre[class*='language-'] {
      color: #e0e6f1;
      background: none;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;

      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    pre[class*='language-']::-moz-selection,
    pre[class*='language-'] ::-moz-selection,
    code[class*='language-']::-moz-selection,
    code[class*='language-'] ::-moz-selection {
      text-shadow: none;
      background: #383e49;
    }

    pre[class*='language-']::selection,
    pre[class*='language-'] ::selection,
    code[class*='language-']::selection,
    code[class*='language-'] ::selection {
      text-shadow: none;
      background: #9aa2b1;
    }

    @media print {
      code[class*='language-'],
      pre[class*='language-'] {
        text-shadow: none;
      }
    }
    /* Code blocks */
    pre[class*='language-'] {
      padding: 1em;
      margin: 0.5em 0;
      overflow: auto;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
      background: #282c34;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
      padding: 0.1em;
      border-radius: 0.3em;
      white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #5c6370;
    }

    .token.punctuation {
      color: #abb2bf;
    }

    .token.selector,
    .token.tag {
      color: #e06c75;
    }

    .token.property,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.attr-name,
    .token.deleted {
      color: #d19a66;
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.builtin,
    .token.inserted {
      color: #98c379;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: #56b6c2;
    }

    .token.atrule,
    .token.keyword {
      color: #c678dd;
    }

    .token.function {
      color: #61afef;
    }

    .token.regex,
    .token.important,
    .token.variable {
      color: #c678dd;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }

    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    pre.line-numbers {
      position: relative;
      padding-left: 3.8em;
      counter-reset: linenumber;
    }

    pre.line-numbers > code {
      position: relative;
    }

    .line-numbers .line-numbers-rows {
      position: absolute;
      pointer-events: none;
      top: 0;
      font-size: 100%;
      left: -3.8em;
      width: 3em; /* works for line-numbers below 1000 lines */
      letter-spacing: -1px;
      border-right: 0;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .line-numbers-rows > span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
    }

    .line-numbers-rows > span:before {
      content: counter(linenumber);
      color: #5c6370;
      display: block;
      padding-right: 0.8em;
      text-align: right;
    }
  `,
  'atom-one-light': css`
    code,
    code[class*='language-'],
    pre[class*='language-'] {
      color: #24292e;
    }
    pre {
      box-shadow: 0px 0px 2px #00000005;
      background: #fbfcfd;
      color: #24292e;
      /* background: white; */
    }
    .token.builtin {
      color: #0184bc;
    }
    .token.function {
      color: #005cc5;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #969896;
    }
    .token.punctuation {
      color: #24292e;
    }
    .token.atrule,
    .token.attr-value {
      color: #183691;
    }
    .token.property,
    .token.tag {
      color: #63a35c;
    }
    .token.boolean,
    .token.number {
      color: #986801;
    }
    .token.selector,
    .token.attr-name,
    .token.attr-value .punctuation:first-child,
    .token.keyword,
    .token.regex,
    .token.important {
      color: #a626a4;
    }
    .token.operator {
      color: #0184bc;
    }
    .token.entity,
    .token.url,
    .language-css,
    .token.string {
      color: #50a14f;
    }
    .token.entity {
      cursor: help;
    }
    .namespace {
      opacity: 0.7;
    }
  `,
  github: css`
    /**
   * Github-like theme for Prism.js
   * @author Luke Askew http://github.com/lukeaskew
   */
    code,
    code[class*='language-'],
    pre[class*='language-'] {
      color: #24292e;
    }
    pre {
      color: #24292e;
      background: #f6f8fa;
    }
    .token.function {
      color: #005cc5;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #969896;
    }
    .token.punctuation {
      color: #24292e;
    }
    .token.string {
      color: #032f62;
    }
    .token.atrule,
    .token.attr-value {
      color: #183691;
    }
    .token.property,
    .token.tag {
      color: #63a35c;
    }
    .token.boolean,
    .token.number {
      color: #0086b3;
    }
    .token.selector,
    .token.attr-name,
    .token.attr-value .punctuation:first-child,
    .token.keyword,
    .token.regex,
    .token.important {
      color: #d73a49;
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css {
      color: #d73a49;
    }
    .token.entity {
      cursor: help;
    }
    .namespace {
      opacity: 0.7;
    }
  `,
  monokai: css`
    /**
 * Monokai theme for Prism.JS
 *
 * @author Martijn Swaagman
 * @license MIT 2015
 */

    code[class*='language-'],
    pre[class*='language-'] {
      color: #f8f8f2;
      text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
      background: #272822;
    }

    pre {
      color: #f8f8f2;
      text-shadow: 0 1px rgba(0, 0, 0, 0.3);
      background: #272822;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #778090;
    }

    .token.punctuation {
      color: #f8f8f2;
    }

    .namespace {
      opacity: 0.7;
    }

    .token.property,
    .token.tag,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: #f92672;
    }

    .token.boolean,
    .token.number {
      color: #ae81ff;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: #a6e22e;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string,
    .token.variable {
      color: #f8f8f2;
    }

    .token.atrule,
    .token.attr-value,
    .token.function {
      color: #e6db74;
    }

    .token.keyword {
      color: #f92672;
    }

    .token.regex,
    .token.important {
      color: #fd971f;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }

    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }
  `,
  dracula: css`
    /* PrismJS 1.14.0
http://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+abap+actionscript+ada+apacheconf+apl+applescript+c+arff+asciidoc+asm6502+aspnet+autohotkey+autoit+bash+basic+batch+bison+brainfuck+bro+cpp+csharp+arduino+coffeescript+clojure+ruby+csp+css-extras+d+dart+diff+django+docker+eiffel+elixir+elm+markup-templating+erlang+fsharp+flow+fortran+gedcom+gherkin+git+glsl+go+graphql+groovy+haml+handlebars+haskell+haxe+http+hpkp+hsts+ichigojam+icon+inform7+ini+io+j+java+jolie+json+julia+keyman+kotlin+latex+less+liquid+lisp+livescript+lolcode+lua+makefile+markdown+erb+matlab+mel+mizar+monkey+n4js+nasm+nginx+nim+nix+nsis+objectivec+ocaml+opencl+oz+parigp+parser+pascal+perl+php+php-extras+sql+powershell+processing+prolog+properties+protobuf+pug+puppet+pure+python+q+qore+r+jsx+typescript+renpy+reason+rest+rip+roboconf+crystal+rust+sas+sass+scss+scala+scheme+smalltalk+smarty+plsql+soy+stylus+swift+tcl+textile+twig+tsx+vbnet+velocity+verilog+vhdl+vim+visual-basic+wasm+wiki+xeora+xojo+yaml&plugins=line-numbers+toolbar+show-language */

    /**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

    /*
* Dracula Theme for Prism.JS
*
* @author Gustavo Costa
* e-mail: gusbemacbe@gmail.com
*
* @contributor Jon Leopard
* e-mail: jonlprd@gmail.com
*
* @license MIT 2016-2018
*/

    code[class*='language-'],
    pre[class*='language-'] {
      color: #ccc;
      background: rgb(40, 41, 54);
    }

    pre[class*='language-']::-moz-selection,
    pre[class*='language-'] ::-moz-selection,
    code[class*='language-']::-moz-selection,
    code[class*='language-'] ::-moz-selection {
      text-shadow: none;
      background-color: #5a5f80;
    }

    pre[class*='language-']::selection,
    pre[class*='language-'] ::selection,
    code[class*='language-']::selection,
    code[class*='language-'] ::selection {
      text-shadow: none;
      background-color: #5a5f80;
    }

    /* Inline code */

    :not(pre) > code[class*='language-'] {
      border-radius: 0.3em;
      white-space: normal;
    }

    pre {
      color: #ccc;
      background: rgb(40, 41, 54);
    }

    .limit-300 {
      height: 300px !important;
    }

    .limit-400 {
      height: 400px !important;
    }

    .limit-500 {
      height: 500px !important;
    }

    .limit-600 {
      height: 600px !important;
    }

    .limit-700 {
      height: 700px !important;
    }

    .limit-800 {
      height: 800px !important;
    }

    .token.comment {
      color: rgba(98, 114, 164, 1);
    }

    .token.prolog {
      color: rgba(207, 207, 194, 1);
    }

    .token.tag {
      color: rgba(220, 104, 170, 1);
    }

    .token.entity {
      color: rgba(139, 233, 253, 1);
    }

    .token.atrule {
      color: rgba(98, 239, 117, 1);
    }

    .token.url {
      color: rgba(102, 217, 239, 1);
    }

    .token.selector {
      color: rgba(207, 207, 194, 1);
    }

    .token.string {
      color: rgba(241, 250, 140, 1);
    }

    .token.property {
      color: rgba(255, 184, 108, 1);
    }

    .token.important {
      color: rgba(255, 121, 198, 1);
      font-weight: bold;
    }

    .token.punctuation {
      color: rgba(230, 219, 116, 1);
    }

    .token.number {
      color: rgba(189, 147, 249, 1);
    }

    .token.function {
      color: rgba(80, 250, 123, 1);
    }

    .token.class-name {
      color: rgba(255, 184, 108, 1);
    }

    .token.keyword {
      color: rgba(255, 121, 198, 1);
    }

    .token.boolean {
      color: rgba(255, 184, 108, 1);
    }

    .token.operator {
      color: rgba(139, 233, 253, 1);
    }

    .token.char {
      color: rgba(255, 135, 157, 1);
    }

    .token.regex {
      color: rgba(80, 250, 123, 1);
    }

    .token.variable {
      color: rgba(80, 250, 123, 1);
    }

    .token.constant {
      color: rgba(255, 184, 108, 1);
    }

    .token.symbol {
      color: rgba(255, 184, 108, 1);
    }

    .token.builtin {
      color: rgba(255, 121, 198, 1);
    }

    .token.attr-value {
      color: #7ec699;
    }

    .token.deleted {
      color: #e2777a;
    }

    .token.namespace {
      color: #e2777a;
    }

    .token.bold {
      font-weight: bold;
    }

    .token.italic {
      font-style: italic;
    }

    .token {
      color: #ff79c6;
    }

    .langague-cpp .token.string {
      color: #8be9fd;
    }

    .langague-c .token.string {
      color: #8be9fd;
    }

    .language-css .token.selector {
      color: rgba(80, 250, 123, 1);
    }

    .language-css .token.property {
      color: rgba(255, 184, 108, 1);
    }

    .language-java span.token.class-name {
      color: #8be9fd;
    }

    .language-java .token.class-name {
      color: #8be9fd;
    }

    .language-markup .token.attr-value {
      color: rgba(102, 217, 239, 1);
    }

    .language-markup .token.tag {
      color: rgba(80, 250, 123, 1);
    }

    .language-objectivec .token.property {
      color: #66d9ef;
    }

    .language-objectivec .token.string {
      color: #50fa7b;
    }

    .language-php .token.boolean {
      color: #8be9fd;
    }

    .language-php .token.function {
      color: #ff79c6;
    }

    .language-php .token.keyword {
      color: #66d9ef;
    }

    .language-ruby .token.symbol {
      color: #8be9fd;
    }

    .language-ruby .token.class-name {
      color: #cfcfc2;
    }

    pre.line-numbers {
      position: relative;
      padding-left: 3.8em;
      counter-reset: linenumber;
    }

    pre.line-numbers > code {
      position: relative;
      white-space: inherit;
    }

    .line-numbers .line-numbers-rows {
      position: absolute;
      pointer-events: none;
      top: 0;
      font-size: 100%;
      left: -3.8em;
      width: 3em;
      /* works for line-numbers below 1000 lines */
      letter-spacing: -1px;
      border-right: 1px solid #999;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .line-numbers-rows > span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
    }

    .line-numbers-rows > span:before {
      content: counter(linenumber);
      color: #999;
      display: block;
      padding-right: 0.8em;
      text-align: right;
    }

    div.code-toolbar {
      position: relative;
    }

    div.code-toolbar > .toolbar {
      position: absolute;
      top: 0.3em;
      right: 0.2em;
      transition: opacity 0.3s ease-in-out;
      opacity: 0;
    }

    div.code-toolbar:hover > .toolbar {
      opacity: 1;
    }

    div.code-toolbar > .toolbar .toolbar-item {
      display: inline-block;
      padding-right: 20px;
    }

    div.code-toolbar > .toolbar a {
      cursor: pointer;
    }

    div.code-toolbar > .toolbar button {
      background: none;
      border: 0;
      color: inherit;
      font: inherit;
      line-height: normal;
      overflow: visible;
      padding: 0;
      -webkit-user-select: none;
      /* for button */
      -moz-user-select: none;
      -ms-user-select: none;
    }

    div.code-toolbar > .toolbar a,
    div.code-toolbar > .toolbar button,
    div.code-toolbar > .toolbar span {
      color: #ccc;
      font-size: 0.8em;
      padding: 0.5em;
      background: rgba(98, 114, 164, 1);
      border-radius: 0.5em;
    }

    div.code-toolbar > .toolbar a:hover,
    div.code-toolbar > .toolbar a:focus,
    div.code-toolbar > .toolbar button:hover,
    div.code-toolbar > .toolbar button:focus,
    div.code-toolbar > .toolbar span:hover,
    div.code-toolbar > .toolbar span:focus {
      color: inherit;
      text-decoration: none;
      background-color: var(--verde);
    }
  `,
  //   'duotone-light': css`
  //     /*
  // Name:   Duotone Light
  // Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
  // Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-morning-light.css)
  // Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)
  // */

  //     code[class*='language-'],
  //     pre[class*='language-'] {
  //       background: #faf8f5;
  //       color: #728fcb;
  //     }

  //     pre[class*='language-']::-moz-selection,
  //     pre[class*='language-'] ::-moz-selection,
  //     code[class*='language-']::-moz-selection,
  //     code[class*='language-'] ::-moz-selection {
  //       text-shadow: none;
  //       background: #faf8f5;
  //     }

  //     pre[class*='language-']::selection,
  //     pre[class*='language-'] ::selection,
  //     code[class*='language-']::selection,
  //     code[class*='language-'] ::selection {
  //       text-shadow: none;
  //       background: #faf8f5;
  //     }

  //     pre {
  //       background: #faf8f5;
  //       color: #728fcb;
  //     }

  //     .token.comment,
  //     .token.prolog,
  //     .token.doctype,
  //     .token.cdata {
  //       color: #b6ad9a;
  //     }

  //     .token.punctuation {
  //       color: #b6ad9a;
  //     }

  //     .token.namespace {
  //       opacity: 0.7;
  //     }

  //     .token.tag,
  //     .token.operator,
  //     .token.number {
  //       color: #063289;
  //     }

  //     .token.property,
  //     .token.function {
  //       color: #b29762;
  //     }

  //     .token.tag-id,
  //     .token.selector,
  //     .token.atrule-id {
  //       color: #2d2006;
  //     }

  //     code.language-javascript,
  //     .token.attr-name {
  //       color: #896724;
  //     }

  //     code.language-css,
  //     code.language-scss,
  //     .token.boolean,
  //     .token.string,
  //     .token.entity,
  //     .token.url,
  //     .language-css .token.string,
  //     .language-scss .token.string,
  //     .style .token.string,
  //     .token.attr-value,
  //     .token.keyword,
  //     .token.control,
  //     .token.directive,
  //     .token.unit,
  //     .token.statement,
  //     .token.regex,
  //     .token.atrule {
  //       color: #728fcb;
  //     }

  //     .token.placeholder,
  //     .token.variable {
  //       color: #93abdc;
  //     }

  //     .token.deleted {
  //       text-decoration: line-through;
  //     }

  //     .token.inserted {
  //       border-bottom: 1px dotted #2d2006;
  //       text-decoration: none;
  //     }

  //     .token.italic {
  //       font-style: italic;
  //     }

  //     .token.important,
  //     .token.bold {
  //       font-weight: bold;
  //     }

  //     .token.important {
  //       color: #896724;
  //     }

  //     .token.entity {
  //       cursor: help;
  //     }

  //     pre > code.highlight {
  //       outline: 0.4em solid #896724;
  //       outline-offset: 0.4em;
  //     }

  //     /* overrides color-values for the Line Numbers plugin
  //  * http://prismjs.com/plugins/line-numbers/
  //  */

  //     .line-numbers .line-numbers-rows {
  //       border-right-color: #ece8de;
  //     }

  //     .line-numbers-rows > span:before {
  //       color: #cdc4b1;
  //     }

  //     /* overrides color-values for the Line Highlight plugin
  //  * http://prismjs.com/plugins/line-highlight/
  //  */

  //     .line-highlight {
  //       background: rgba(45, 32, 6, 0.2);
  //       background: -webkit-linear-gradient(
  //         left,
  //         rgba(45, 32, 6, 0.2) 70%,
  //         rgba(45, 32, 6, 0)
  //       );
  //       background: linear-gradient(
  //         to right,
  //         rgba(45, 32, 6, 0.2) 70%,
  //         rgba(45, 32, 6, 0)
  //       );
  //     }
  //   `,
};

export default prismThemes;
