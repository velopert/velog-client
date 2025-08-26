// googlebot-and-userfetcher-ip-cache.ts
import axios from 'axios';
import CidrMatcher from 'cidr-matcher';

export interface IPRangeDoc {
  prefixes: {
    ipv4Prefix?: string;
    ipv6Prefix?: string;
    service: string; // e.g., "googlebot", "user-triggered-fetchers"
    scope: string; // e.g., "global"
  }[];
  creationTime?: string;
}

type CachePack = {
  fetchedAt: number;
  googlebot: IPRangeDoc;
  userFetchers: IPRangeDoc;
  cidrs: string[];
  matcher: CidrMatcher;
};

export default class GoogleCrawlIPCache {
  private static readonly URL_GOOGLEBOT =
    'https://developers.google.com/search/apis/ipranges/googlebot.json';
  private static readonly URL_USER_FETCHERS =
    'https://developers.google.com/search/apis/ipranges/user-triggered-fetchers-google.json';
  private static readonly ONE_HOUR = 60 * 60 * 1000;

  private cache: CachePack | null = null;
  private inflight: Promise<CachePack> | null = null;
  private cacheDurationMs: number;

  constructor(cacheDurationMs: number = GoogleCrawlIPCache.ONE_HOUR) {
    this.cacheDurationMs = cacheDurationMs;
  }

  /** 통합 CIDR 매처로 검사 (IPv4/IPv6 지원) */
  public async isCrawlerIP(ip: string): Promise<boolean> {
    const pack = await this.getCachePack();
    return pack.matcher.contains(ip);
  }

  /** 통합 CIDR 목록 반환 */
  public async getAllCIDRs(): Promise<string[]> {
    const pack = await this.getCachePack();
    return pack.cidrs.slice();
  }

  /** 원본 두 문서 반환 */
  public async getRawDocs(): Promise<{
    googlebot: IPRangeDoc;
    userFetchers: IPRangeDoc;
  }> {
    const pack = await this.getCachePack();
    return { googlebot: pack.googlebot, userFetchers: pack.userFetchers };
  }

  /** 강제 무효화 */
  public invalidate(): void {
    this.cache = null;
  }

  /** 마지막 갱신 시각(ms) */
  public getLastFetched(): number | null {
    return this.cache?.fetchedAt ?? null;
  }

  /** 남은 TTL(ms). 캐시 없으면 0 */
  public getTtlRemainingMs(): number {
    if (!this.cache) return 0;
    const remain = this.cache.fetchedAt + this.cacheDurationMs - Date.now();
    return Math.max(0, remain);
  }

  // 내부 구현부

  private async getCachePack(): Promise<CachePack> {
    const now = Date.now();

    if (this.cache && now - this.cache.fetchedAt < this.cacheDurationMs) {
      return this.cache;
    }

    if (this.inflight) {
      return this.inflight;
    }

    this.inflight = this.fetchBoth()
      .then((pack) => {
        this.cache = pack;
        return pack;
      })
      .finally(() => {
        this.inflight = null;
      });

    return this.inflight;
  }

  private async fetchBoth(): Promise<CachePack> {
    const headers = {
      'User-Agent': 'GoogleCrawlIPCache/1.0',
      Accept: 'application/json',
    };

    const [gbRes, ufRes] = await Promise.all([
      axios.get<IPRangeDoc>(GoogleCrawlIPCache.URL_GOOGLEBOT, {
        headers,
        timeout: 15000,
      }),
      axios.get<IPRangeDoc>(GoogleCrawlIPCache.URL_USER_FETCHERS, {
        headers,
        timeout: 15000,
      }),
    ]);

    const googlebot = gbRes.data;
    const userFetchers = ufRes.data;

    // 두 문서의 CIDR을 합쳐서 매처 구성
    const cidrs: string[] = [];
    for (const p of googlebot.prefixes || []) {
      if (p.ipv4Prefix) cidrs.push(p.ipv4Prefix);
      if (p.ipv6Prefix) cidrs.push(p.ipv6Prefix);
    }
    for (const p of userFetchers.prefixes || []) {
      if (p.ipv4Prefix) cidrs.push(p.ipv4Prefix);
      if (p.ipv6Prefix) cidrs.push(p.ipv6Prefix);
    }

    // 중복 제거(간단 Set)
    const uniqueCidrs = Array.from(new Set(cidrs));
    const matcher = new CidrMatcher(uniqueCidrs);

    return {
      fetchedAt: Date.now(),
      googlebot,
      userFetchers,
      cidrs: uniqueCidrs,
      matcher,
    };
  }
}
