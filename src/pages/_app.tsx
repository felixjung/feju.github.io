/** @jsx jsx */

import {
  FunctionComponent,
  RefObject,
  useState,
  useEffect,
  useRef,
} from 'react';
import Link from 'next/link';
import { css, jsx } from '@emotion/core';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { transparentize } from 'polished';
import {
  BaseStyles,
  Navigation,
  NavigationItem,
  spacing,
  themes,
  Theme,
} from '@felixjung/plastuiq';

import styled from '../styled';

global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PRODUCTION__ = process.env.NODE_ENV === 'production';

const CONTENT_WIDTH = '40rem';
const hPadding = 'small';

const Header = styled('header')<{ isFixed: boolean }>(
  ({ theme }) => css`
    background-color: ${transparentize(0.15, theme.colors.n100)};
    backdrop-filter: none;
    border-bottom: 1px solid;
    border-color: transparent;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    transition: backdrop-filter, border-color 150ms ease-in-out;
  `,
  ({ theme, isFixed }) =>
    isFixed &&
    css`
      border-color: ${theme.colors.n300};
      backdrop-filter: saturate(180%) blur(${theme.spacings.mini});
      // ${theme.shadows.low};
    `,
);

const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      css={(theme) => css`
        align-items: center;
        display: flex;
        height: ${theme.spacings.colossal};
        justify-content: center;
      `}
    >
      &copy; 2017 - {currentYear}, Copyright Felix Jung
    </footer>
  );
};

const Layout: React.FC = ({ children }) => {
  const navHeight = 'huge';
  const ref = useRef<HTMLDivElement | null>(null);
  const onScreen = useOnScreen<HTMLDivElement>(ref);

  return (
    <div
      css={css`
        min-height: 100vh;
      `}
    >
      <Header isFixed={!onScreen}>
        <Navigation
          css={(theme) => css`
            background-color: transparent;
            max-width: ${CONTENT_WIDTH};
            ${spacing([null, hPadding], 'padding')(theme)};
          `}
        >
          <Link href="/blog/pages/1" passHref>
            <NavigationItem href="/blog/pages/1">Blog</NavigationItem>
          </Link>
          <Link href="/about" passHref>
            <NavigationItem href="/about">About</NavigationItem>
          </Link>
        </Navigation>
      </Header>
      <div ref={ref} />
      <div
        css={(theme: Theme) => css`
          scroll-padding-top: ${theme.spacings[navHeight]};
          ${spacing(['huge', null])(theme)};
        `}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themes.light}>
      <BaseStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

function useOnScreen<T extends HTMLElement>(
  ref: RefObject<T>,
  rootMargin = '0px',
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );

    let refInstance: T;

    if (ref && ref.current) {
      refInstance = ref.current;
      observer.observe(refInstance);
    }

    return () => {
      observer.unobserve(refInstance);
    };
  });

  return isIntersecting;
}
