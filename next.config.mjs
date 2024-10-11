/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // For static export and i18n configuration
    i18n: {
        locales: ['de', 'en'],
        defaultLocale: 'en',
    },

    // These settings are important for GitHub Pages
    basePath: '/sovereigncloudstack.org', // Replace with your repository name
    assetPrefix: '/sovereigncloudstack.org/', // Replace with your repository name
    trailingSlash: true, // Adds trailing slash to every route to work with GitHub Pages

    // Optional: Disable server-side rendering completely to ensure static export
    output: 'export', // Enable static export
};

export default nextConfig;
