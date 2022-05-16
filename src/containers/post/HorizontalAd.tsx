import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import media from '../../lib/styles/media';

interface Props {}

function initDesktopAd() {
  if (window.innerWidth < 768) return;
  (function () {
    var size = '728x90',
      adunit = 'velog.io_728x90_leaderboard_DFP',
      childNetworkId = '22738196472',
      xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var es = document.querySelectorAll("[data-id='" + adunit + "']");
        var e = Array.from(es).filter(function (e) {
          return !e.hasAttribute('data-rendered');
        });
        if (e.length > 0) {
          e.forEach(function (el: any) {
            var iframe = el.contentWindow.document;
            iframe.open();
            iframe.write(xmlhttp.responseText);
            iframe.close();
            el.setAttribute('data-rendered', true as any);
          });
        }
      }
    };
    var child = childNetworkId.trim() ? ',' + childNetworkId.trim() : '';
    xmlhttp.open(
      'GET',
      'https://pubads.g.doubleclick.net/gampad/adx?iu=/147246189' +
        child +
        '/' +
        adunit +
        '&sz=' +
        encodeURI(size) +
        '&t=Placement_type%3Dserving&' +
        Date.now(),
      true,
    );
    xmlhttp.send();
  })();
}

function initMobileAd() {
  (function () {
    if (window.innerWidth > 580) return;
    var size = '320x100',
      adunit = 'velog.io_320x100_leaderboard_DFP',
      childNetworkId = '22738196472',
      xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var es = document.querySelectorAll("[data-id='" + adunit + "']");
        var e = Array.from(es).filter(function (e) {
          return !e.hasAttribute('data-rendered');
        });
        if (e.length > 0) {
          e.forEach(function (el: any) {
            var iframe = el.contentWindow.document;
            iframe.open();
            iframe.write(xmlhttp.responseText);
            iframe.close();
            el.setAttribute('data-rendered', true);
          });
        }
      }
    };
    var child = childNetworkId.trim() ? ',' + childNetworkId.trim() : '';
    xmlhttp.open(
      'GET',
      'https://pubads.g.doubleclick.net/gampad/adx?iu=/147246189' +
        child +
        '/' +
        adunit +
        '&sz=' +
        encodeURI(size) +
        '&t=Placement_type%3Dserving&' +
        Date.now(),
      true,
    );
    xmlhttp.send();
  })();
}

function HorizontalAd({}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !initializedRef.current) {
            initializedRef.current = true;
            initDesktopAd();
            initMobileAd();
            console.log('initialized!');
          }
        });
      },
      {
        rootMargin: '90px',
        threshold: 0,
      },
    );
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <VelogResponsive>
      <Wrapper ref={ref}>
        <Desktop>
          <iframe
            title="desktop-horizontal"
            data-id="velog.io_728x90_leaderboard_DFP"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            width="1"
            height="1"
          ></iframe>
        </Desktop>
        <Mobile>
          <iframe
            title="mobile-horizontal"
            data-id="velog.io_320x100_leaderboard_DFP"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            width="1"
            height="1"
          ></iframe>
        </Mobile>
      </Wrapper>
    </VelogResponsive>
  );
}

const Wrapper = styled.div`
  max-height: 400px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Desktop = styled.div`
  display: flex;
  justify-content: center;
  iframe {
    width: 728px;
    height: 90px;
  }
  ${media.small} {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;
  justify-content: center;
  ${media.custom(580)} {
    display: flex;
  }
`;

export default HorizontalAd;
