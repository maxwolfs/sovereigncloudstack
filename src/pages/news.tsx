import React, { useState, useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import { Box, Grid, Text, NavLink } from 'theme-ui';
import Footer from '../components/Footer';
import MenuOverlay from '../components/MenuOverlay';
import TopNavigation from '../components/TopNavigation';
import CustomButton from '../components/CustomButton';
import { formatGermanDate } from '../helpers/formatGermanDate';

// Definiere den Typ für `pageContext`
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
            more_news_button: string;
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
    const [logoSrc, setLogoSrc] = useState('/logo/scs-horizontal-black.svg'); // Default logo
    const [visibleEvents, setVisibleEvents] = useState<number>(3);
    const [visibleNews, setVisibleNews] = useState<number>(3);
    const [visibleBlog, setVisibleBlog] = useState<number>(3);

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
                <Box
                    sx={{
                        gridColumn: ['1 / -1', null, '1 / 7'],
                        zIndex: ['-1000', '-1000', '-1000', '-1000'],
                    }}
                >
                    <Text
                        variant='heading'
                        sx={{
                            fontSize: [6, 7, 7, 8],
                        }}
                    >
                        {page.frontmatter.headline_events}
                    </Text>
                </Box>

                {/* Events Section */}
                <Grid
                    columns={[2, 4, 4, 6]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridTemplateRows: 'auto',
                        my: 5,
                    }}
                >
                    {events.slice(0, visibleEvents).map((event) => (
                        <Box
                            key={event.id}
                            sx={{
                                gridColumn: ['1 / -1', null, '2 / 6'],
                                borderBottom: '2px black solid',
                                position: 'relative',
                                minHeight: '150px',
                            }}
                        >
                            <Grid
                                columns={[2, 4, 4, 6]}
                                gap={[4, 20, 20, 40]}
                                sx={{
                                    gridTemplateRows: 'auto',
                                }}
                            >
                                <Box
                                    sx={{
                                        gridColumn: ['1 / -1', null, '1 / 2'],
                                    }}
                                >
                                    <Text sx={{ fontSize: 0 }}>
                                        {formatGermanDate(
                                            event.frontmatter.date
                                        )}
                                    </Text>
                                </Box>
                                <Box
                                    sx={{
                                        gridColumn: ['1 / -1', null, '2 / 6'],
                                    }}
                                >
                                    <Box>
                                        <Text
                                            variant='heading'
                                            sx={{ fontSize: 2 }}
                                        >
                                            {event.frontmatter.title}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text sx={{ mt: 3 }}>
                                            {event.excerpt}
                                        </Text>
                                    </Box>
                                </Box>
                            </Grid>

                            <NavLink
                                href={`/${event.frontmatter.slug}`}
                                sx={{
                                    display: 'inline-block',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    textDecoration: 'none',
                                    px: 3,
                                    py: 2,
                                    fontSize: 1,
                                    borderRadius: 0,
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: 'secondary',
                                    },
                                }}
                            >
                                Mehr →
                            </NavLink>
                        </Box>
                    ))}
                </Grid>
                {visibleEvents < events.length && (
                    <Box
                        sx={{
                            textAlign: 'center',
                            maxWidth: '400px',
                            m: 'auto',
                        }}
                    >
                        <NavLink
                            onClick={() => setVisibleEvents((prev) => prev + 5)}
                            sx={{
                                cursor: 'pointer',
                                display: 'inline-block',
                                backgroundColor: 'black', 
                                color: 'white',
                                textDecoration: 'none',
                                px: 3,
                                py: 2, 
                                fontSize: 1, 
                                borderRadius: 0, 
                                boxShadow: 'none', 
                                '&:hover': {
                                    backgroundColor: 'secondary',
                                },
                            }}
                        >
                            Mehr Veranstaltungen ↓
                        </NavLink>
                    </Box>
                )}

                {/* News Section */}
                <Text
                    variant='heading'
                    sx={{
                        fontSize: [6, 7, 7, 8],
                    }}
                >
                    {page.frontmatter.headline_news}
                </Text>
                <Grid
                    columns={[2, 4, 4, 6]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridTemplateRows: ['300px', null, null, '100px'],
                    }}
                >
                    {news.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                p: 4,
                                bg: 'muted',
                                gridColumn: ['1 / -1', null, '2 / 6'],
                            }}
                        >
                            <Text
                                variant='bold'
                                sx={{ fontSize: 2, color: 'primary' }}
                            >
                                {formatGermanDate(item.frontmatter.date)}
                            </Text>
                            <Text variant='heading' sx={{ fontSize: 3 }}>
                                {item.frontmatter.title}
                            </Text>
                            <Text>{item.excerpt}</Text>
                            <NavLink href={`/${item.frontmatter.slug}`}>
                                Details
                            </NavLink>
                        </Box>
                    ))}
                </Grid>

                {/* Blog Section */}
                <Text
                    variant='heading'
                    sx={{
                        fontSize: [6, 7, 7, 8],
                    }}
                >
                    {page.frontmatter.headline_blog}
                </Text>
                <Grid
                    columns={[2, 4, 4, 6]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridTemplateRows: ['300px', null, null, '100px'],
                    }}
                >
                    {blog.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                p: 4,
                                bg: 'muted',
                                gridColumn: ['1 / -1', null, '2 / 6'],
                            }}
                        >
                            <Text
                                variant='bold'
                                sx={{ fontSize: 2, color: 'primary' }}
                            >
                                {item.frontmatter.author} -{' '}
                                {formatGermanDate(item.frontmatter.date)}
                            </Text>
                            <Text variant='heading' sx={{ fontSize: 3 }}>
                                {item.frontmatter.title}
                            </Text>
                            <Text>{item.excerpt}</Text>
                            <NavLink href={`/${item.frontmatter.slug}`}>
                                Details
                            </NavLink>
                        </Box>
                    ))}
                </Grid>
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
                more_news_button
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
                excerpt
            }
        }
    }
`;

export default NewsPage;
