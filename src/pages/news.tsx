import React, { useState, useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import { Box } from 'theme-ui';
import Footer from '../components/Footer';
import MenuOverlay from '../components/MenuOverlay';
import TopNavigation from '../components/TopNavigation';
import NewsSectionList from '../components/NewsSectionList';

interface CustomPageContext {
    language: string;
}

interface NewsPageData {
    page: {
        frontmatter: {
            title: string;
            description: string;
            headline_events: string;
            headline_news: string;
            headline_blog: string;
            more_events_button: string;
            more_news_button: string;
            more_blogPosts_button: string;
            more_button: string;
        };
    };
    posts: {
        nodes: Array<{
            id: string;
            frontmatter: {
                title: string;
                date: string;
                type: string;
                slug: string;
                author?: string;
            };
            excerpt: string;
        }>;
    };
}

const NewsPage: React.FC<PageProps<NewsPageData, CustomPageContext>> = ({
    data,
    pageContext,
}) => {
    const { language } = pageContext;
    const { page, posts } = data;
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

    // Filter posts by type
    const events = posts.nodes.filter(
        (post) => post.frontmatter.type === 'event'
    );
    const news = posts.nodes.filter((post) => post.frontmatter.type === 'news');
    const blog = posts.nodes.filter((post) => post.frontmatter.type === 'blog');

    return (
        <>
            <title>{page.frontmatter.title} – Sovereign Cloud Stack</title>
            <meta name='description' content={page.frontmatter.description} />

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
                <NewsSectionList
                    items={events}
                    headline={page.frontmatter.headline_events}
                    language={language}
                    moreButtonText={page.frontmatter.more_button}
                    loadMoreItemsButtonText={
                        page.frontmatter.more_events_button
                    }
                />
                <NewsSectionList
                    items={news}
                    headline={page.frontmatter.headline_news}
                    language={language}
                    moreButtonText={page.frontmatter.more_button}
                    loadMoreItemsButtonText={page.frontmatter.more_news_button}
                />
                <NewsSectionList
                    items={blog}
                    headline={page.frontmatter.headline_blog}
                    language={language}
                    moreButtonText={page.frontmatter.more_button}
                    loadMoreItemsButtonText={
                        page.frontmatter.more_blogPosts_button
                    }
                />
            </Box>

            <Footer />
        </>
    );
};

export const query = graphql`
    query NewsPageQuery($language: String!) {
        page: markdownRemark(
            frontmatter: { language: { eq: $language }, page: { eq: "news" } }
        ) {
            frontmatter {
                title
                description
                headline_events
                headline_news
                headline_blog
                more_button
                more_news_button
                more_blogPosts_button
                more_events_button
            }
        }
        posts: allMarkdownRemark(
            filter: { frontmatter: { language: { eq: $language } } }
            sort: { frontmatter: { date: DESC } }
        ) {
            nodes {
                id
                frontmatter {
                    title
                    date
                    type
                    slug
                    author
                }
                excerpt(pruneLength: 150) # Automatically generate an excerpt
            }
        }
    }
`;

export default NewsPage;
