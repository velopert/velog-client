import TurndownService from 'turndown';
import pipe from 'ramda/es/pipe';

let turndownService: TurndownService | null = null;

const EMBED_OPEN = `@@VELOG-EMBED-OPEN@@`;
const EMBED_CLOSE = `@@VELOG-EMBED-CLOSE@@`;

function convertEmbedded(html: string) {
  let _html = html;

  const youtubeRegex = /<iframe class="youtube" (.*?)<\/iframe>/g;
  const youtubeCodeRegex = /embed\/(.*?)"/;

  const matches = html.match(youtubeRegex);
  if (matches) {
    matches.forEach(tag => {
      const code = tag.match(youtubeCodeRegex)![1];
      _html = _html.replace(
        tag,
        `!youtube${EMBED_OPEN}${code}${EMBED_CLOSE}\n\n`,
      );
    });
  }

  return _html;
}

function unescapeEmbedded(text: string) {
  const openRegex = new RegExp(EMBED_OPEN, 'g');
  const closeRegex = new RegExp(EMBED_CLOSE, 'g');
  return text.replace(openRegex, '[').replace(closeRegex, ']\n\n');
}

export default function convertToMarkdown(html: string): string {
  // initialize turndownService
  if (!turndownService) {
    turndownService = new TurndownService({
      headingStyle: 'atx',
    });
  }
  if (!turndownService) return '';

  turndownService.addRule('linethrough', {
    filter: ['del'],
    replacement: content => `~${content}~`,
  });
  turndownService.addRule('codeblock', {
    filter: ['pre'],
    replacement: content => {
      return `\`\`\`
${content}
\`\`\``;
    },
  });
  turndownService.addRule('underline', {
    filter: ['u'],
    replacement: content => `<u>${content}</u>`,
  });
  turndownService.addRule('ordered listItem', {
    filter: el => {
      return !!(
        el.tagName === 'LI' &&
        el.parentElement &&
        el.parentElement.tagName === 'OL'
      );
    },
    replacement: (content, node, options) => {
      const indent = ~~(node as any).className.replace('ql-indent-', '');
      const spaces = ' '.repeat(indent * 2);
      const parent = node.parentNode;
      const siblings = [...(parent!.children as any)].filter(
        el => el.className === (node as any).className,
      );
      const index = siblings.indexOf(node);
      return `\n${spaces} ${index + 1}. ${content}`;
    },
  });

  const convert = pipe(
    convertEmbedded,
    (text: string) => turndownService!.turndown(text),
    unescapeEmbedded,
  );

  return convert(html);
}
