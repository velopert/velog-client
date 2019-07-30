import { escapeForUrl } from './utils';

/**
 * Set unique id for each headings (only for h1, h2, h3)
 * @param html
 */
export function setHeadingId(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;

  const h1 = div.querySelectorAll('h1');
  const h2 = div.querySelectorAll('h2');
  const h3 = div.querySelectorAll('h3');

  const idList: string[] = [];

  const setId = (element: HTMLHeadingElement) => {
    const id = escapeForUrl(element.innerText);
    const exists = idList.filter(existingId => existingId.indexOf(id) !== -1);
    const uniqueId = `${id}${exists.length === 0 ? '' : `-${exists.length}`}`;
    element.id = uniqueId;
    idList.push(uniqueId);
  };

  [h1, h2, h3].forEach(elements => elements.forEach(setId));

  return div.innerHTML;
}

/**
 * Parses heading for building TOC
 * @param html
 */
export function parseHeadings(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;

  const elements = Array.from(div.children);

  const headings = elements.filter(el => el.tagName.match(/H([1-3])/));

  const headingsInfo = headings.map(heading => ({
    id: heading.id,
    text: heading.textContent,
    level: parseInt(heading.tagName.replace('H', ''), 10),
  }));

  const minLevel = Math.min(
    ...Array.from(headingsInfo.map(info => info.level)),
  );

  headingsInfo.forEach(info => {
    info.level -= minLevel;
  });

  return headingsInfo;
}
