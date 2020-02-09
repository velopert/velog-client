export default function gtag(...params: any[]) {
  if (typeof window === 'undefined') return;
  const { gtag } = window as any;
  if (!gtag) return;
  gtag(...params);
}
