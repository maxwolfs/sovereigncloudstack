import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Box, Text, useThemeUI } from 'theme-ui';
import Layout from '../components/Layout';

interface NewsPostProps {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string;
                date: string;
                language: string;
                authors: Array<{ name: string; image: any }>;
                featuredImage: any;
                enableAnimation?: boolean
            };
            html: string;
        };
    };
}

const NewsPost: React.FC<NewsPostProps> = ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;

    const featuredImage = getImage(frontmatter.featuredImage);
    const [showOverlay] = useState<boolean>(false);

    const { theme } = useThemeUI();

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
        <Layout
            pageContext={{
                frontmatter: {
                    enableAnimation: frontmatter.enableAnimation ?? true, // Default-Wert
                },
            }}
        >            <title>{frontmatter.title} – Sovereign Cloud Stack</title>

            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    my: [2, 3, 3, 5],
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
                <Box
                    sx={{
                        mt: 3,
                    }}
                >
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
                                        mr: 3,
                                    }}
                                    key={index}
                                >
                                    {authorImage && (
                                        <Box
                                            sx={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <GatsbyImage
                                                image={authorImage}
                                                alt={author.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
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
                    sx={{
                        variant: 'styles.content',
                        background: theme.colors?.background,
                    }}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </Box>
        </Layout>
    );
};

export const query = graphql`
    query ($slug: String!, $language: String!) {
        markdownRemark(
            frontmatter: { slug: { eq: $slug }, language: { eq: $language } }
        ) {
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                language
                enableAnimation
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
