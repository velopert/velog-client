export function isIPad() {
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  const platform = navigator.platform;

  // iPadOS 13 이상: MacIntel + 터치포인트 존재
  const iPadOS = platform === 'MacIntel' && navigator.maxTouchPoints > 1;

  // iOS 12 이하 또는 구형 iPad 인식
  const legacyiPad = /iPad/.test(ua);

  // 일부 iPad Pro는 iPhone처럼 나오는 경우도 있어서 iOS 디바이스 + 큰 화면 기준 추가
  const weirdSafariCase = /Macintosh/.test(ua) && 'ontouchend' in document;

  return iPadOS || legacyiPad || weirdSafariCase;
}

export function isTablet() {
  const ua = navigator.userAgent.toLowerCase();
  const checkIPad = isIPad();

  return checkIPad || /tablet|(android(?!.*mobile))/i.test(ua);
}
