/* eslint-disable @typescript-eslint/no-var-requires */
const htmlparser = require('htmlparser2');
const html = `<h1>헤딩 어쩌고 저쩌고</h1><p><br></p><p>랄라랄<strong>라랄랄라</strong></p><p><br></p><ul><li>asdf</li><li class="ql-indent-1">asdfasdf</li><li class="ql-indent-2">asdfasdf</li><li class="ql-indent-3">asdfasdf</li></ul><p><br></p><blockquote>djWJrh</blockquote><p>asdf</p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a'</span>);↵</pre><p>어쩌고 저쩌고 블라블라릅라라</p><p><br></p><p><a href="https://laftel.net/" target="_blank">어쩌고</a></p><p><br></p><p><br></p><p><img src="https://images.velog.io/images/blablabla/post/cead441a-2804-4df3-b6be-ca4e15589e37/스크린샷 2019-07-27 오전 2.22.17.png"></p><h2>궁시렁 궁시렁</h2><p><br></p><p>궁시렁 궁시렁</p><p><br></p><p>안녕하세요</p><p><br></p><p>안녕하세요</p><p><br></p><p>안녕하세요</p><p><br></p><p>안녕하세요 한글 작성</p><p>한글 작성 시</p><p>한글 작성시</p><p>안녕</p><p><br></p><p>이상한데</p><p><br></p><h1>뭔가가</h1><p><br></p><h3>이상한데</h3><p><br></p><p>잘 되는거 맞나?</p><p><br></p><p>작성을 하게 되는 과정에서</p><p>이응이 가아아아아</p><p>아아아아아</p><p>아아아안다</p><p><br></p><p>이상하네.. 뭔가</p><p><br></p><h2>뭐지</h2>`;

function convertAttributesToString(attributes) {
  const entries = Object.entries(attributes);
  return entries.reduce(
    (acc, current) => acc + ` ${current[0]}="${current[1]}"`,
    '',
  );
}

const parser = new htmlparser.Parser({
  onopentag: (name, attributes, text) => {
    const attributesStr = convertAttributesToString(attributes);
    console.log({ text });
    console.log(`<${name}${attributesStr} id="@{1}">`);
  },
  ontext: text => {
    console.log(text);
  },
  onclosetag: tagname => {
    console.log(`</${tagname}>`);
  },
});

parser.write(html);
parser.end();
