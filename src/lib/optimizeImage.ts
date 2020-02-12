export default function optimizeImage(url: string, width: number) {
  if (!url.includes('https://images.velog.io')) return url;
  return url.replace('://images', '://img').concat(`?w=${width}`);
}
