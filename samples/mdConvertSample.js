const TurndownService = require('turndown');
// let html = `<div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="당신의 이야기를 적어보세요..."><p><img src="https://i.imgur.com/bGRMSL4.jpg"></p><p>이미지 첨부도 하고</p><p><br></p><h1>헤딩1도 작성하고</h1><h2>헤딩2도 작성하고</h2><h3>헤딩3도 작성하고</h3><h4>헤딩4도 작성하고</h4><p><br></p><p>일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데일반텍스트인데 일반텍스트인데</p><p><br></p><p><br></p><p>일반텍스트인데 일반텍스트인데</p><p>일반텍스트인데 일반텍스트인데</p><p>일반텍스트인데 일반텍스트인데</p><p>일반텍스트인데 일반텍스트인데</p><p><br></p><p>일반텍스트인데 일반텍스트인데</p><p><br></p><p>일반텍스트인데 일반텍스트인데</p><p><br></p><p>일반텍스트인데 일반텍스트인데</p><p>일반텍스트인데 일반텍스트인데</p><p>일반텍스트인데 일반텍스트인데</p><p><br></p><p>일반텍스트 내부에 <strong>ㅁㄴㅇㄹㄴㄹㅇ</strong> <em>ㅁㄴㅇㄹㅁㄴ</em> <u>ㅁㄴㄹㅁㄴㅇㄹ ㅁㄴㅇㄹㄴㅇㄹㄴ</u></p><p><br></p><p>ㄴㅇ<s>ㄹㄴㅇㄹ</s></p><p><br></p><ul><li>ㅁㄴㅇㄹㅁ</li><li>ㅁㄹㅁㄴㅇㄹ</li><li>ㅁㄴㄹㅁㄴㅇㄹㄴㅇㅁㄹ</li><li>ㅁㄴㅇㄹㅁㄴㅇㄹ</li><li class="ql-indent-1">중첩이 되어있는 불렛포인트</li><li class="ql-indent-1">나는 이걸가지고 어떻게</li><li class="ql-indent-2">삽질을 할지 잘 모르겠다.</li><li class="ql-indent-2">리얼 모르겠따.</li></ul><p><br></p><ol><li>ololol</li><li>ololol</li><li class="ql-indent-1">ㅁㄴㅇㄹㅁㄴㅇㄹ</li><li class="ql-indent-1">ㅁㄴㅇㄹㄴㅇㄹ</li></ol><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span>);

// <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>() </span>{
//   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span>);
// }
// </pre><p><br></p><p>asdfasdf</p><p><br></p><blockquote>asdfasdf</blockquote><blockquote><br></blockquote><blockquote>asdf</blockquote><blockquote><br></blockquote><blockquote>asdf</blockquote><blockquote>asdfasfasdfasd</blockquote><blockquote>fasfasdfasd</blockquote><blockquote>fasdfasdf</blockquote><p><br></p><p>이정도면 <a href="https://google.com/" target="_blank">있는거</a> 다 사용한거죠? </p><p><br></p><p><br></p><p><br></p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>`;

let html = `<del>Hi there</del>`;
const replaceMultiBlockquote = text =>
  text.replace(/<\/blockquote><blockquote>/g, '<br/>'); // credits to Hyeseong kim

html = replaceMultiBlockquote(html);
const turndownService = new TurndownService();

turndownService.addRule('linethrough', {
  filter: ['del'],
  replacement: content => `~${content}~`,
});

turndownService.addRule('codeblock', {
  filter: ['pre'],
  replacement: content => {
    return `\`\`\`
${content}
\`\`\`(${content})`;
  },
});

turndownService.addRule('underline', {
  filter: ['u'],
  replacement: content => `<u>${content}</u>`,
});

Array.from({ length: 8 }).forEach((_, i) => {
  const number = i + 1;
  const spaces = ' '.repeat(number * 2);
  turndownService.addRule(`li.ql-indent-${number}`, {
    filter: el => {
      return (
        el.tagName === 'LI' &&
        el.className === `ql-indent-${number}` &&
        el.parentElement.tagName === 'UL'
      );
    },
    replacement: content => {
      return `\n${spaces}* ${content}`;
    },
  });
});

turndownService.addRule('ordered listItem', {
  filter: el => {
    return el.tagName === 'LI' && el.parentElement.tagName === 'OL';
  },
  replacement: (content, node, options) => {
    const indent = ~~node.className.replace('ql-indent-', '');
    const spaces = ' '.repeat(indent * 2);
    const parent = node.parentNode;
    const siblings = [...parent.children].filter(
      el => el.className === node.className,
    );
    const index = siblings.indexOf(node);
    return `\n${spaces} ${index + 1}. ${content}`;
  },
});

const markdown = turndownService.turndown(html);

console.log(markdown);
