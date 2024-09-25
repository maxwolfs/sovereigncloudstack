import type { Theme } from 'theme-ui';

export const theme: Theme = {
    breakpoints: ['40em', '52em', '64em'],
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fonts: {
        body: 'Dazzed',
        heading: 'Dazzed',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [16, 18, 23, 27, 34, 48, 60, 80, 130],
    fontWeights: {
        body: 400,
        heading: 400,
        bold: 800,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.125,
    },
    letterSpacings: {
        heading: '-0.05em',
        caps: '0.1em',
    },
    colors: {
        text: '#111',
        background: '#fff',
        primary: '#465DFF',
        secondary: '#50ffaa',
        muted: '#f6f6f6',
        boxBackground: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 0px 40px 20px rgba(255, 255, 255, 1)',
        modes: {
            dark: {
                text: '#f6f6f6',
                background: '#111',
                primary: '#1C2566',
                secondary: '#50ffaa',
                boxBackground: 'rgba(0, 0, 0, 0.8)',
                boxShadow: 'rgba(0, 0, 0, 1)',
            },
        },
    },
    text: {
        heading: {
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontWeight: 'heading',
            fontFeatureSettings: "'ss06'",
            wordWrap: 'break-word',
        },
        body: {
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body',
            fontFeatureSettings: "'ss06'",
            wordWrap: 'break-word',
        },
        bold: {
            fontFamily: 'body',
            fontWeight: 'bold',
            lineHeight: 'body',
            fontFeatureSettings: "'ss06'",
            wordWrap: 'break-word',
        },
    },
    buttons: {
        primary: {
            color: 'background',
            fontFamily: 'body',
            fontWeight: '400',
            lineHeight: 'body',
            bg: 'primary',
            textAlign: 'center',
            cursor: 'pointer',
            py: ['8px', '8px', '8px', '8px'],
            px: ['8px', '8px', '8px', '12px'],
            maxWidth: '225px',
            textDecoration: 'none',
        },
        secondary: {
            color: 'background',
            fontFamily: 'body',
            fontWeight: '400',
            lineHeight: 'body',
            bg: 'text',
            textAlign: 'center',
            cursor: 'pointer',
            py: ['8px', '8px', '8px', '8px'],
            px: ['8px', '8px', '8px', '12px'],
            width: '100%',
            textDecoration: 'none',
        },
    },
    styles: {
        root: {
            fontFamily: 'Dazzed',
            lineHeight: 'body',
            fontWeight: 'body',
        },
        h1: {
            variant: 'text.heading',
            fontSize: 5,
        },
        h2: {
            variant: 'text.heading',
            fontSize: 4,
        },
        h3: {
            variant: 'text.heading',
            fontSize: 3,
        },
        h4: {
            variant: 'text.heading',
            fontSize: 2,
        },
        h5: {
            variant: 'text.heading',
            fontSize: 1,
        },
        h6: {
            variant: 'text.heading',
            fontSize: 0,
        },
        pre: {
            fontFamily: 'monospace',
            overflowX: 'auto',
            code: {
                color: 'inherit',
            },
        },
        code: {
            fontFamily: 'monospace',
            fontSize: 'inherit',
        },
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
        },
        th: {
            textAlign: 'left',
            borderBottomStyle: 'solid',
        },
        td: {
            textAlign: 'left',
            borderBottomStyle: 'solid',
        },
    },
};
