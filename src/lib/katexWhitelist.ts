const tags = [
  'math',
  'annotation',
  'semantics',
  'mtext',
  'mn',
  'mo',
  'mi',
  'mspace',
  'mover',
  'munder',
  'munderover',
  'msup',
  'msub',
  'msubsup',
  'mfrac',
  'mroot',
  'msqrt',
  'mtable',
  'mtr',
  'mtd',
  'mlabeledtr',
  'mrow',
  'menclose',
  'mstyle',
  'mpadded',
  'mphantom',
  'mglyph',
  'svg',
  'path',
  'line',
];

const attributes = tags.reduce((acc, current) => {
  acc[current] = ['*'];
  return acc;
}, {} as Record<string, string[]>);

const styles = [
  'background-color',
  'border-bottom-width',
  'border-color',
  'border-right-style',
  'border-right-width',
  'border-top-width',
  'border-style',
  'border-width',
  'bottom',
  'color',
  'height',
  'left',
  'margin',
  'margin-left',
  'margin-right',
  'margin-top',
  'min-width',
  'padding-left',
  'position',
  'top',
  'width',
  'vertical-align',
].reduce((acc, current) => {
  acc[current] = [/.*/];
  return acc;
}, {} as Record<string, RegExp[]>);

const katexWhitelist = {
  tags,
  attributes,
  styles,
};

export default katexWhitelist;
