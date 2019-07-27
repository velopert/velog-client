export const shareFacebook = (href: string) => {
  const FB = (window as any).FB;
  if (!FB) return;

  FB.ui({
    method: 'share',
    href,
  });
};

export const shareTwitter = (href: string, text: string) => {
  window.open(
    `https://twitter.com/share?url=${encodeURI(
      encodeURI(href),
    )}&text=${text}&hashtags=velog`,
    'sharer',
    'toolbar=0,status=0,width=626,height=436',
  );
};

export const copyText = (text: string) => {
  const tempInput = document.createElement('input');
  tempInput.type = 'text';
  tempInput.value = text;
  if (!document.body) return;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('Copy');
  if (!document.body) return;
  document.body.removeChild(tempInput);
};
