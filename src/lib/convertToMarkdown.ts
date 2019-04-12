import TurndownService from 'turndown';

let turndownService: TurndownService | null = null;

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

  return turndownService.turndown(html);
}
