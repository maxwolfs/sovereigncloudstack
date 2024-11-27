import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Box, Grid, Text } from 'theme-ui';
import MenuOverlay from '../components/MenuOverlay';
import TopNavigation from '../components/TopNavigation';
import Footer from '../components/Footer';

interface NewsPostProps {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string;
                date: string;
                language: string;
                authors: Array<{ name: string; image: any }>;
                featuredImage: any;
            };
            html: string;
        };
    };
}

const NewsPost: React.FC<NewsPostProps> = ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;

    const featuredImage = getImage(frontmatter.featuredImage);
    const [logoSrc, setLogoSrc] = useState('/logo/scs-horizontal-black.svg');
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

    return (
        <>
            <title>{frontmatter.title} – Sovereign Cloud Stack</title>

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
                    px: ['20px', '40px', '100px', '200px'],
                }}
            >
                <Box sx={{ mt: 3 }}>
                    <Text variant='body' sx={{ fontSize: [0, 1, 1, 2] }}>
                        {frontmatter.date}
                    </Text>
                </Box>
                <Box>
                    <Text
                        variant='heading'
                        sx={{
                            fontSize: [6, 7, 7, 8],
                        }}
                    >
                        {frontmatter.title}
                    </Text>
                </Box>
                {featuredImage && (
                    <GatsbyImage
                        image={featuredImage}
                        alt={`Cover image for ${frontmatter.title}`}
                    />
                )}
                <Box sx={{ mt: 3 }}>
                    <Box>
                        {frontmatter.authors.map((author, index) => {
                            const authorImage = author.image
                                ? getImage(author.image)
                                : null;
                            return (
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                    key={index}
                                >
                                    {authorImage && (
                                        <Box
                                            sx={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                overflow: 'hidden', // Ensures the image stays within the circular boundary
                                            }}
                                        >
                                            <GatsbyImage
                                                image={authorImage}
                                                alt={author.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%', // Ensures the image itself is rounded
                                                }}
                                            />
                                        </Box>
                                    )}
                                    <Text
                                        variant='body'
                                        sx={{ fontSize: [0, 1, 1, 2] }}
                                    >
                                        {author.name}
                                    </Text>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                <Box
                    sx={{ variant: 'styles.content' }}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </Box>
            <Footer />
        </>
    );
};

export const query = graphql`
    query ($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                language
                authors {
                    name
                    image {
                        childImageSharp {
                            gatsbyImageData(layout: CONSTRAINED)
                        }
                    }
                }
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(layout: CONSTRAINED)
                    }
                }
            }
            html
        }
    }
`;

export default NewsPost;
