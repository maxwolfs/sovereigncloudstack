import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
    siteMetadata: {
        title: `sovereigncloudstack.org`,
        siteUrl: `https://www.sovereigncloudstack.org`,
    },
    graphqlTypegen: true,
    plugins: [
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-theme-ui',
        'gatsby-plugin-image',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/favicon.png',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark', // Use for Markdown support
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1200,
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'content',
                path: './src/content/', // Path to your Markdown content files
            },
            __key: 'content',
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './src/images/',
            },
            __key: 'images',
        },
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                localeJsonSourceName: 'locales', // name given to `gatsby-source-filesystem` plugin
                languages: [`en`, `de`],
                defaultLanguage: `en`,
                siteUrl: `https://www.sovereigncloudstack.org`,
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false, // not needed for react as it escapes by default
                    },
                    keySeparator: false,
                },
                pages: [
                    {
                        matchPath: '/:lang?/index',
                        getLanguageFromPath: true,
                    },
                    {
                        matchPath: '/:lang?/blog/:uid',
                        getLanguageFromPath: true,
                    },
                    {
                        matchPath: '/:lang?/team/:uid',
                        getLanguageFromPath: true,
                    },
                ],
            },
        },
    ],
};

export default config;
