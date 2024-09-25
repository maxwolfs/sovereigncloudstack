/** @jsxImportSource theme-ui */
import type { AppProps } from 'next/app';
import { ThemeUIProvider } from 'theme-ui';
import { theme } from '../theme';
import { Global, css } from '@emotion/react';

const globalStyles = css`
    @font-face {
        font-family: 'Dazzed';
        src: url('/fonts/Dazzed-SemiBold.woff2');
        font-style: normal;
        font-weight: 400;
        font-display: swap;

    }

    @font-face {
        font-family: 'Dazzed';
        src: url('/fonts/Dazzed-Bold.woff2');
        font-style: normal;
        font-weight: 800;
        font-display: swap;
    }
    
    .no-scroll {
        overflow: hidden;
    }
`;

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Global styles={globalStyles} />
            <ThemeUIProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeUIProvider>
        </>
    );
}
