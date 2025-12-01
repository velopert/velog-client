declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
    fusetag: { que: unknown[] };
  }
}

export {};
