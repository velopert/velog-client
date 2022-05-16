import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/styles/media';
import gtag from '../../lib/gtag';
import { themedPalette } from '../../lib/styles/themes';
import { useTheme } from '../../lib/hooks/useTheme';

function init() {
  (function () {
    var size = '320x378',
      adunit = 'velog.io_320x378_native_DFP',
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

function SetupAdFeed() {
  useEffect(() => {
    init();
  }, []);

  return (
    <Block>
      <iframe
        title="nativead"
        data-id="velog.io_320x378_native_DFP"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        width="1"
        height="1"
      ></iframe>
    </Block>
  );
}

const Block = styled.div`
  width: 20rem;
  margin: 1rem;
  min-height: 23.5625rem;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
  background: ${themedPalette.bg_element1};

  ${mediaQuery(1056)} {
    width: calc(50% - 2rem);
  }
  ${mediaQuery(767)} {
    margin: 0;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 5rem;
  }
`;

export default SetupAdFeed;
