/** @jsxImportSource theme-ui */
import React from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Footer from '@/components/Footer';
import TopNavigation from '@/components/TopNavigation';
import MenuOverlay from '@/components/MenuOverlay';
import { defaultContent } from '@/content/defaultContent';
import { Box, Text } from 'theme-ui';

const Page: React.FC<{ content: any }> = ({ content }) => {
    const [showOverlay, setShowOverlay] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (showOverlay) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showOverlay]);

    const mergedContent = {
        ...defaultContent,
        ...content,
        meta: { ...defaultContent.meta, ...content.meta },
    };

    return (
        <>
            <Head>
                <title>{mergedContent.title}</title>
                <meta name='viewport' content={mergedContent.meta.viewport} />
                <link rel='icon' href='/favicon.png' />
                <meta
                    name='description'
                    content={mergedContent.meta.description}
                />
                <meta
                    property='og:description'
                    content={mergedContent.meta.og_description}
                />
                <meta property='og:url' content={mergedContent.meta.og_url} />
                <meta
                    property='og:site_name'
                    content={mergedContent.meta.og_site_name}
                />
                <meta
                    property='og:title'
                    content={mergedContent.meta.og_title}
                />
                <meta property='og:type' content={mergedContent.meta.og_type} />
                <meta
                    property='og:image'
                    content={mergedContent.meta.og_image}
                />
            </Head>

            {showOverlay && (
                <MenuOverlay
                    showOverlay={showOverlay}
                    setShowOverlay={setShowOverlay}
                    logoSrc='/logo/scs-horizontal-black.svg'
                />
            )}

            <TopNavigation
                setShowOverlay={setShowOverlay}
                logoSrc='/logo/scs-horizontal-black.svg'
                showOverlay={showOverlay}
            />

            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    px: ['20px', '40px'],
                    py: [5, 6],
                    background: 'url(/images/bg1.webp)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <Text
                    variant='heading'
                    sx={{
                        fontSize: [6, 7, 7, 8],
                        mb: 4,
                    }}
                >
                    {mergedContent.title}
                </Text>
                <Text
                    variant='body'
                    sx={{
                        fontSize: [2, 3, 3, 4],
                    }}
                >
                    {mergedContent.text}
                </Text>
            </Box>

            <Footer />
        </>
    );
};

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'impressum' } },
            { params: { slug: 'agb' } },
            { params: { slug: 'datenschutz' } },
        ],
        fallback: false,
    };
}

export async function getStaticProps({ params, locale }: any) {
    const filePath = path.join(process.cwd(), `content/${params.slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const content = data[locale];

    return {
        props: {
            content,
        },
    };
}

export default Page;
