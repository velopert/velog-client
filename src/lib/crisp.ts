export default function initializeCrisp() {
  const w = window as any;
  w.$crisp = [];
  w.CRISP_WEBSITE_ID = '6076ead8-a751-4170-83c1-d4bc2d9a9edc';
  (function() {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;
    d.getElementsByTagName('head')[0].appendChild(s);
  })();
}

type SetCrispUserParams = {
  email: string;
  nickname: string;
  avatar: string | null;
};
export function setCrispUser({ email, nickname, avatar }: SetCrispUserParams) {
  const w = window as any;
  if (!w.$crisp) {
    w.$crisp = [];
  }
  const crispArray: any[] = w.$crisp;
  crispArray.push(['set', 'user:email', email]);
  crispArray.push(['set', 'user:nickname', nickname]);
  if (avatar) {
    crispArray.push(['set', 'user:avatar', avatar]);
  }
}
