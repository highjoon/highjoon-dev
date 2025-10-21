'use client';

import { useEffect, useRef } from 'react';
import { useMantineColorScheme } from '@mantine/core';

const LegacyComments = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();

  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'highjoon/highjoon-dev');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOJ8jN7A');
    scriptElem.setAttribute('data-category', 'Comments');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOJ8jN7M4CeWzr');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'ko');
    scriptElem.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(scriptElem);
  }, [theme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);

  return <section ref={ref} />;
};

export default LegacyComments;
