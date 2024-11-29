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
                path: `${__dirname}/src/content`,
            },
            __key: 'content',
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images/`,
            },
            __key: 'images',
        },
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                languages: [`en`, `de`],
                defaultLanguage: `en`,
                siteUrl: `https://www.sovereigncloudstack.org`,
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false,
                    },
                    keySeparator: false,
                },
                pages: [
                    {
                        matchPath: '/:lang?/index', // Match the root path and language-specific root
                        getLanguageFromPath: true,
                    }
                ],
            },
        },
    ],
};

export default config;
