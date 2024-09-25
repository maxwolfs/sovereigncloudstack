/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Footer from '@/components/Footer';
import TopNavigation from '@/components/TopNavigation';
import MenuOverlay from '@/components/MenuOverlay';
import { defaultContent } from '@/content/defaultContent';
import HeroSection from '@/components/sections/HeroSection';
import SecondSection from '@/components/sections/SecondSection';
import ThirdSection from '@/components/sections/ThirdSection';
import FourthSection from '@/components/sections/FourthSection';
import { Content, Section } from '@/types/types';

const Home: React.FC<{ content: Content }> = ({ content }) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    useEffect(() => {
        if (showOverlay) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showOverlay]);

    const mergedContent: Content = {
        ...defaultContent,
        ...content,
        meta: { ...defaultContent.meta, ...content.meta },
        sections: content.sections || defaultContent.sections, // ensure sections are merged properly
    };

    return (
        <>
            <Head>
                <title>{mergedContent.title}</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
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

            {mergedContent.sections.map((section: Section, index: number) => {
                switch (section.type) {
                    case 'hero':
                        return <HeroSection key={index} section={section} />;
                    case 'second':
                        return <SecondSection key={index} section={section} />;
                    case 'third':
                        return <ThirdSection key={index} section={section} />;
                    case 'fourth':
                        return <FourthSection key={index} section={section} />;
                    default:
                        return null;
                }
            })}

            <Footer />
        </>
    );
};

export async function getStaticProps({ locale }: any) {
    const filePath = path.join(process.cwd(), 'content', 'index.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const content = data[locale];

    return {
        props: {
            content,
        },
    };
}

export default Home;
