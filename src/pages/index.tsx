import React, { useEffect, useState } from 'react';
import { Box, Grid, NavLink, Text, useColorMode, useThemeUI } from 'theme-ui';
import { graphql } from 'gatsby';
import MenuOverlay from '../components/MenuOverlay';
import TopNavigation from '../components/TopNavigation';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import { StaticImage } from 'gatsby-plugin-image';
import { useI18next } from 'gatsby-plugin-react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Home({ data }: any) {
    const { theme } = useThemeUI();
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [colorMode, setColorMode] = useColorMode();
    const [logoSrc, setLogoSrc] = useState('/logo/scs-horizontal-black.svg'); // Default image
    const { language } = useI18next();


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
                <StaticImage
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
                />

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
                    mt: 6,
                    px: ['20px', '40px'],
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
                <Grid columns={[1, null, 3]} gap={4}>
                    {content.sections[1].boxes.map((box: any, index: number) => (
                        <Box
                            key={index}
                            sx={{
                                background: theme.colors?.boxBackground,
                                boxShadow: theme.colors?.boxShadow,
                                p: 4,
                                mb: 4,
                            }}
                        >
                            <Text variant='bold'>{box.title}</Text> <br />
                            <Text>{box.text}</Text>
                        </Box>
                    ))}
                </Grid>
            </Box>

            {/* Third Section */}
            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    mt: 6,
                    px: ['20px', '40px'],
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
                <Text
                    variant='heading'
                    sx={{
                        fontSize: [6, 7, 8],
                        textAlign: 'center',
                        py: 6,
                    }}
                >
                    {content.sections[2].headline1}
                </Text>
                <br />
                <Text variant='body' sx={{ textAlign: 'center' }}>
                    {content.sections[2].text}
                </Text>
            </Box>

            {/* Fourth Section with Personas */}
            <Box
                sx={{
                    maxWidth: '1920px',
                    m: 'auto',
                    mt: 6,
                    px: ['20px', '40px'],
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
                <Text variant='heading' sx={{ fontSize: [6, 7, 8] }}>
                    {content.sections[3].headline1} <br />
                    {content.sections[3].headline2}
                </Text>
                <Grid columns={[1, null, 3]} gap={4}>
                    {content.sections[3].personas.map((persona: any, index: number) => (
                        <Box
                            key={index}
                            sx={{
                                background: theme.colors?.boxBackground,
                                boxShadow: theme.colors?.boxShadow,
                                p: 4,
                                mb: 4,
                            }}
                        >
                            <Text variant='bold'>{persona.title}</Text>
                            <br />
                            <Text>{persona.text}</Text>
                        </Box>
                    ))}
                </Grid>
            </Box>

            <Footer />
        </>
    );
}
export const query = graphql`
    query HomePageQuery($language: String!) {
        markdownRemark(frontmatter: { language: { eq: $language } }) {
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
