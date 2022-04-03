export default function optimizeImage(url: string, width?: number) {
  if (url.includes('imagedelivery.net')) {
    return optimizeImageForCloudflare(url, width);
  }
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

export function optimizeImageForCloudflare(url: string, width?: number) {
  if (!width) return url;
  const replacer = (variant: string) => url.replace('public', variant);
  if (width === 640) return replacer('w640');
  if (width === 768) return replacer('w768');
  if (width === 240) return replacer('512x512');
  if (width === 120) return replacer('256x256');
  return url;
}
