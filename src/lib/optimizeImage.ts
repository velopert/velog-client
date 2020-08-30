export default function optimizeImage(url: string, width?: number) {
  if (!url.includes('https://images.velog.io')) return url;

  let replaced = url.replace('://images.velog.io', '://media.vlpt.us'); // Cloudflare
  // let replaced = url.replace('://images', '://img'); // Cloudfront

  if (!width) {
    return replaced;
  }
  return replaced.concat(`?w=${width}`);
}
