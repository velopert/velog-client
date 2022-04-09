export default function optimizeImage(
  url: string,
  /**
   * S3 -> velcdn으로 넘어가면서 당장은 비활성화 상태. 나중에 다시 돌려놓을 예정
   */
  width?: number,
) {
  if (
    !url.includes('https://images.velog.io') &&
    !url.includes('https://media.vlpt.us')
  )
    return url;

  if (url.includes('?')) return url;
  if (url.includes('.svg')) return url;

  let replaced = url.replace('://images.velog.io', '://velog.velcdn.com');

  // since b2 requires different encoding..
  const filename = replaced.split('/').pop() ?? '';
  const proeperlyEncoded = encodeURIComponent(decodeURI(filename));
  replaced = replaced.replace(filename, proeperlyEncoded);
  return replaced;

  // disabled for now

  // let replaced = url.replace('://images', '://img'); // Cloudfront

  // if (!width) {
  //   return replaced;
  // }
  // return replaced.concat(`?w=${width}`);
}

// https://velog.velcdn.com/images/city7310/post/95db2b3d-44a1-4671-a4ca-af0b2b70bca2/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7,%202021-04-18%2021-09-35.png
