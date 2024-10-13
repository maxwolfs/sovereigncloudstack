import React, { useEffect, useState } from 'react';
import { Box, Grid, NavLink, Text, useColorMode, useThemeUI } from 'theme-ui';
import { graphql, navigate } from 'gatsby';
import MenuOverlay from '../components/MenuOverlay';
import TopNavigation from '../components/TopNavigation';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import { StaticImage } from 'gatsby-plugin-image';

export default function Home({ data, pageContext }: any) {
    const { language } = pageContext;
    const { theme } = useThemeUI();
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [colorMode, setColorMode] = useColorMode();
    const [logoSrc, setLogoSrc] = useState('/logo/scs-horizontal-black.svg'); // Default image

    const content = data.markdownRemark.frontmatter;

    useEffect(() => {
        const updateColorMode = () => {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const newMode = prefersDark ? 'dark' : 'default';
            setColorMode(newMode);
        };

        // Initial check and setup
        updateColorMode();
        const mediaQueryList = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        mediaQueryList.addEventListener('change', updateColorMode);

        // Cleanup
        return () =>
            mediaQueryList.removeEventListener('change', updateColorMode);
    }, [setColorMode]);

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

    if (!content || !content.meta || !content.sections) {
        return <div>Error: Content is missing!</div>; // Optionally, replace this with a loading state
    }

    return (
        <>
            <title>{content.title} – </title>
            <meta name='viewport' content={content.meta.viewport} />
            <meta name='description' content={content.meta.description} />
            <meta
                property='og:description'
                content={content.meta.og_description}
            />
            <meta property='og:url' content={content.meta.og_url} />
            <meta property='og:site_name' content={content.meta.og_site_name} />
            <meta property='og:title' content={content.meta.og_title} />
            <meta property='og:type' content={content.meta.og_type} />
            <meta property='og:image' content={content.meta.og_image} />
            <link rel='icon' href='/favicon.png' />

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

            {/* Hero Section */}
            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    mt: 6,
                    px: ['20px', '20px', '20px', '40px'],
                }}
            >
                {/* <StaticImage
                    src='../images/bg3.webp' // Adjust to your actual image path in src
                    alt='Background'
                    layout='fullWidth'
                    placeholder='blurred'
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1, // Send to background
                    }}
                /> */}

                <Grid
                    columns={[2, 4, 4, 6]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridTemplateRows: ['300px', null, null, '100px'],
                    }}
                >
                    <Box
                        sx={{
                            gridColumn: ['2 / 2', '4 / 4', '4 / 4', '6 / 6'],
                        }}
                    >
                        <Box
                            my={[3, 4, 6]}
                            sx={{
                                background: theme.colors?.boxBackground,
                                boxShadow: theme.colors?.boxShadow,
                            }}
                        >
                            <Text
                                variant='body'
                                sx={{ fontSize: [0, 1, 1, 1] }}
                            >
                                {content.news?.date} <br />
                                {content.news?.title}
                                <br />
                            </Text>
                            <Text
                                variant='body'
                                sx={{ fontSize: [0, 1, 1, 1] }}
                            >
                                {content.news?.body}
                                <NavLink
                                    href={content.news?.linkUrl}
                                    target='_blank'
                                    sx={{
                                        color: 'primary',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {content.news?.linkText}
                                </NavLink>
                            </Text>
                        </Box>
                    </Box>
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
                            {content.sections[0].headline1} <br />{' '}
                            {content.sections[0].headline2}
                        </Text>
                    </Box>
                    <Box
                        sx={{
                            gridColumn: ['1 / -1', null, '4 / 7'],
                            mt: [0, 4, 4, 5],
                        }}
                    >
                        <Text variant='body' sx={{ fontSize: [1, 3, 3, 4] }}>
                            {content.sections[0].text1}
                        </Text>
                        {content.sections[0].text1?.button && (
                            <Box sx={{ my: [1, 2, 3, 4] }}>
                                <CustomButton
                                    variant='primary'
                                    label={
                                        content.sections[0].text1.button.label
                                    }
                                    href={content.sections[0].text1.button.href}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Box>

            {/* Second Section */}
            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    pt: [7],
                    px: ['20px', '20px', '20px', '40px'],
                }}
            >
                <Grid
                    columns={[1, null, 3]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridColumn: '1 / -1',
                        gridTemplateRows: [null, null, null, '100px'],
                        width: '100%',
                        maxWidth: '1920px',
                        m: 'auto',
                    }}
                >
                    <StaticImage
                        src='../images/bg1.webp' // Adjust to your actual image path in src
                        alt='Background'
                        layout='fullWidth'
                        placeholder='blurred'
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: -1, // Send to background
                        }}
                    />
                    <Box
                        sx={{
                            gridColumn: ['1 / -1', null, '2 / 7'],
                            zIndex: ['-1000', '-1000', '-1000', '-1000'],
                            mb: [0, 4, 4, 7],
                        }}
                    >
                        <Text
                            variant='heading'
                            sx={{
                                fontSize: [6, 7, 7, 8],
                            }}
                        >
                            {content.sections[1].headline1}
                        </Text>
                    </Box>
                </Grid>
                <Grid
                    columns={[1, null, 3]}
                    gap={[4, 4, 4, '40px']}
                    sx={{
                        gridColumn: '1 / -1', // Span across all columns
                        gridTemplateRows: [null, null, null, '300px'],
                        width: '100%', // Full width,
                        maxWidth: '1920px',
                        m: 'auto',
                        pt: [7],
                    }}
                >
                    {content.sections[1].boxes.map(
                        (box: any, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    background: theme.colors?.boxBackground,
                                    boxShadow: theme.colors?.boxShadow,
                                    p: 4,
                                    mb: 4,
                                }}
                            >
                                <Text
                                    variant='bold'
                                    sx={{ fontSize: [1, 2, 2, 2] }}
                                >
                                    {box.title}
                                    <br />
                                </Text>
                                <Text
                                    variant='body'
                                    sx={{ fontSize: [1, 2, 2, 2] }}
                                >
                                    {box.text}
                                </Text>
                                {box.button && (
                                    <Box sx={{ my: [1, 2, 3, 4] }}>
                                        <CustomButton
                                            variant='primary'
                                            label={box.button.label}
                                            href={box.button.href}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )
                    )}
                </Grid>
            </Box>

            {/* Third Section */}
            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    pt: [7],
                    px: ['20px', '20px', '20px', '40px'],
                }}
            >
                <StaticImage
                    src='../images/bg3.webp' // Adjust to your actual image path in src
                    alt='Background'
                    layout='fullWidth'
                    placeholder='blurred'
                    style={{
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1, // Send to background
                    }}
                />
                <Grid
                    columns={[1, null, 6]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridColumn: '1 / -1',
                        width: '100%',
                        maxWidth: '1920px',
                        m: 'auto',
                        gridTemplateRows: '300px',
                    }}
                >
                    <Box
                        sx={{
                            gridColumn: ['1 / -1', null, '1 / 7'],
                            zIndex: ['-1000', '-1000', '-1000', '-1000'],
                            mt: [5, 4, 4, 7],
                        }}
                    >
                        <Text
                            variant='heading'
                            sx={{
                                fontSize: [6, 7, 7, 8],
                            }}
                        >
                            {content.sections[2].headline1}
                        </Text>
                    </Box>
                </Grid>

                <Box
                    sx={{
                        gridColumn: ['1 / -1', null, '5 / 7'],
                        mt: [0, 4, 4, 6],
                        mb: [4, 4, 4, 6],
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            background: theme.colors?.boxBackground,
                            boxShadow: theme.colors?.boxShadow,
                        }}
                    >
                        <Text variant='body' sx={{ fontSize: [0, 1, 1, 2] }}>
                            {content.sections[2].text}
                        </Text>
                    </Box>
                </Box>
            </Box>

            {/* Fourth Section */}
            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    pt: [5, 5, 5, 6],
                    mb: [4, 4, 4, 6],
                    px: ['20px', '20px', '20px', '40px'],
                }}
            >
                <StaticImage
                    src='../images/bg1.webp' // Adjust to your actual image path in src
                    alt='Background'
                    layout='fullWidth'
                    placeholder='blurred'
                    style={{
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1, // Send to background
                    }}
                />
                <Grid
                    columns={[2, 4, 4, 6]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridTemplateRows: [null, null, null, '300px'],
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
                            {content.sections[3].headline1} <br />
                            {content.sections[3].headline2}
                        </Text>
                    </Box>
                    <Box
                        sx={{
                            gridColumn: ['2 / 2', '4 / 4', '4 / 4', '6 / 6'],
                        }}
                    >
                        <Box
                            mb={[3, 3, 3, 4]}
                            sx={{
                                background: theme.colors?.boxBackground,
                                boxShadow: theme.colors?.boxShadow,
                            }}
                        >
                            <Text
                                variant='body'
                                sx={{ fontSize: [1, 1, 1, 1] }}
                            >
                                {content.sections[3].text}
                            </Text>
                            <Box
                                sx={{
                                    background: theme.colors?.boxBackground,
                                    boxShadow: theme.colors?.boxShadow,
                                }}
                            >
                                <Text
                                    variant='body'
                                    sx={{ fontSize: [1, 1, 1, 1] }}
                                >
                                    <NavLink
                                        onClick={() => {
                                            navigate(
                                                content.sections[3].button.href
                                            );
                                        }}
                                        sx={{
                                            color: theme.colors?.primary,
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {content.sections[3].button.label}
                                    </NavLink>
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* Personas */}
                <Grid
                    columns={[1, 1, 3, 3]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridColumn: '1 / -1',
                        width: '100%',
                        maxWidth: '1920px',
                        m: 'auto',
                        mb: 7,
                        mt: 6,
                    }}
                >
                    {content.sections[3].personas.map(
                        (persona: any, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    background: theme.colors?.boxBackground,
                                    boxShadow: theme.colors?.boxShadow,
                                }}
                            >
                                <Text
                                    variant='bold'
                                    sx={{ fontSize: [1, 2, 2, 2] }}
                                >
                                    {persona.title}
                                    <br />
                                </Text>
                                <Text
                                    variant='body'
                                    sx={{ fontSize: [1, 2, 2, 2] }}
                                >
                                    {persona.text}
                                </Text>
                            </Box>
                        )
                    )}
                </Grid>
            </Box>

            <Footer />
        </>
    );
}
export const query = graphql`
    query HomePageQuery($language: String!) {
        markdownRemark(
            frontmatter: { language: { eq: $language }, page: { eq: "standards" } }
        ) {
            frontmatter {
                title
                meta {
                    viewport
                    description
                    og_description
                    og_url
                    og_site_name
                    og_title
                    og_type
                    og_image
                }
                sections {
                    headline1
                    headline2
                    text1
                    text
                    button {
                        href
                        label
                    }
                    boxes {
                        title
                        text
                    }
                    personas {
                        title
                        text
                    }
                }
            }
        }
    }
`;
