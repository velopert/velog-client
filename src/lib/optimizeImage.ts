export default function optimizeImage(url: string, width?: number) {
  if (!url.includes('https://images.velog.io')) return url;

  let replaced = url.replace('://images.velog.io', '://media.vlpt.us');
  if (!width) {
    return replaced;
  }
  return replaced.concat(`?w=${width}`);
}
