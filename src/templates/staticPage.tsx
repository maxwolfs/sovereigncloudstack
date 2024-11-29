import React, { useEffect, useState } from 'react';
import { PageProps, graphql } from 'gatsby';
import MenuOverlay from '../components/MenuOverlay';
import TopNavigation from '../components/TopNavigation';
import { Box } from 'theme-ui';
import Footer from '../components/Footer';

interface CustomPageContext {
    language: string;
}

type StaticPageQueryData = {
    markdownRemark: {
        frontmatter: {
            title: string;
            language: string;
        };
        html: string;
    };
};

const StaticPage: React.FC<
    PageProps<StaticPageQueryData, CustomPageContext>
> = ({ data, pageContext }) => {
    const { markdownRemark } = data;
    const { frontmatter, html } = markdownRemark;

    const { language } = pageContext; // **Prüfe den Kontext hier**
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [logoSrc, setLogoSrc] = useState('/logo/scs-horizontal-black.svg');
    
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

    return (
        <>
            {showOverlay && (
                <MenuOverlay
                    showOverlay={showOverlay}
                    setShowOverlay={setShowOverlay}
                    logoSrc={logoSrc}
                />
            )}

            <TopNavigation
                setShowOverlay={setShowOverlay}
                logoSrc={logoSrc}
                showOverlay={showOverlay}
            />

            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    my: 7,
                    px: ['20px', '20px', '20px', '40px'],
                }}
            >
                <h1>{frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </Box>
            <Footer />
        </>
    );
};

export const query = graphql`
    query StaticPageQuery($slug: String!, $language: String!) {
        markdownRemark(
            frontmatter: { slug: { eq: $slug }, language: { eq: $language } }
        ) {
            frontmatter {
                title
                language
            }
            html
        }
    }
`;

export default StaticPage;
