import { escapeForUrl } from '../utils';

describe('utils', () => {
  it('escapeForUrl', () => {
    const samples = [
      '한글로된 텍스트 사이에 스페이스',
      'title with english',
      'title-with-%-special-characters',
      '  trim  ',
    ];
    const escaped = samples.map(escapeForUrl);
    expect(escaped).toEqual([
      '한글로된-텍스트-사이에-스페이스',
      'title-with-english',
      'title-with-special-characters',
      'trim',
    ]);
  });
});
