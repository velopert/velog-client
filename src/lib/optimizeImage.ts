export default function optimizeImage(url: string, width?: number) {
  if (
    !url.includes('https://images.velog.io') &&
    !url.includes('https://media.vlpt.us')
  )
    return url;

  if (url.includes('?')) return url;
  if (url.includes('.svg')) return url;

  let replaced = url.replace('://images.velog.io', '://media.vlpt.us'); // Cloudflare
  // let replaced = url.replace('://images', '://img'); // Cloudfront

  if (!width) {
    return replaced;
  }
  return replaced.concat(`?w=${width}`);
}
