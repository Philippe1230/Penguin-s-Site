import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { ThemeProvider, themeStyles } from '~/components/theme-provider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Navbar } from '~/layouts/navbar';
import { Progress } from '~/components/progress';
import styles from './root.module.css';
import './reset.module.css';
import './global.module.css';

export const links = () => [
  {
    rel: 'preload',
    href: GothamMedium,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  {
    rel: 'preload',
    href: GothamBook,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  { rel: 'icon', type: 'image/png', href: '/logo_2.png' },
  { rel: 'apple-touch-icon', href: '/logo_2.png' },
];

export default function App() {
  const theme = 'dark';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111" />
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
      </head>

      <body data-theme={theme}>
        <ThemeProvider theme={theme} toggleTheme={() => {}}>
          <Progress />
          <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
            Skip to main content
          </VisuallyHidden>

          <Navbar />

          <main id="main-content" className={styles.container} tabIndex={-1}>
            <Outlet />
          </main>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
