import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Grid, NavLink, useThemeUI, Text, Button } from 'theme-ui';
import { useI18next } from 'gatsby-plugin-react-i18next';

interface FooterProps {
    isAnimationEnabled: boolean;
    toggleAnimation: () => void;
}

const Footer: React.FC<FooterProps> = ({
    isAnimationEnabled,
    toggleAnimation,
}) => {
    const { theme } = useThemeUI();
    const { language } = useI18next();

    const data = useStaticQuery(graphql`
        query FooterQuery {
            allMarkdownRemark(
                filter: { frontmatter: { component: { eq: "footer" } } }
            ) {
                nodes {
                    frontmatter {
                        locale
                        columns {
                            title
                            links {
                                label
                                url
                                icon
                            }
                        }
                    }
                }
            }
        }
    `);

    const footerContent = data.allMarkdownRemark.nodes.find(
        (node: { frontmatter: { locale: string } }) =>
            node.frontmatter.locale === language
    );

    if (!footerContent) {
        return <div>Error: Footer content is missing!</div>;
    }

    const columns = footerContent.frontmatter.columns;

    return (
        <Box
            sx={{
                bg: theme.colors?.primary,
                py: 5,
                px: ['20px', '20px', '20px', '40px'],
            }}
        >
            {/* Wrapper for maxWidth */}
            <Box
                sx={{
                    maxWidth: '1920px',
                    mx: 'auto', // Centers the content horizontally
                }}
            >
                <Grid
                    columns={[1, 1, 6, 6]}
                    gap={[4, 4, 20, 40]}
                    sx={{
                        alignContent: 'center',
                        width: '100%',
                    }}
                >
                    {/* Social Media Icons in the first column */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 3,
                            gridColumn: ['1 / -1', '1 / -1', '1 / 2', '1 / 2'],
                        }}
                    >
                        {columns[0]?.links &&
                            columns[0].links.map((link: any, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    style={{
                                        display: 'inline-block',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '36px',
                                            height: '36px',
                                            transition: 'all 0.3s ease-in-out',
                                            ':hover': {
                                                filter: 'invert(50%) sepia(100%) saturate(1000%) hue-rotate(200deg)', // Secondary color filter
                                            },
                                        }}
                                    >
                                        <img
                                            src={link.icon}
                                            alt={link.label}
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                            }}
                                        />
                                    </Box>
                                </a>
                            ))}
                    </Box>

                    {/* Other columns */}
                    {columns
                        .slice(1)
                        .map((column: any, columnIndex: number) => (
                            <Box
                                key={columnIndex}
                                sx={{
                                    gridColumn: [
                                        '1 / -1',
                                        '1 / -1',
                                        `${columnIndex + 2} / ${
                                            columnIndex + 3
                                        }`,
                                        `${columnIndex + 2} / ${
                                            columnIndex + 3
                                        }`,
                                    ],
                                }}
                            >
                                {column.links && (
                                    <Box sx={{ display: 'grid' }}>
                                        <Box sx={{ mb: 3 }}>
                                            <Text
                                                variant='heading'
                                                sx={{
                                                    color: theme.colors
                                                        ?.background,
                                                }}
                                            >
                                                {column.title}
                                            </Text>
                                        </Box>
                                        {column.links.map(
                                            (link: any, linkIndex: number) => (
                                                <NavLink
                                                    key={linkIndex}
                                                    href={link.url}
                                                    sx={{
                                                        variant: 'links.nav', // Use the custom variant
                                                    }}
                                                >
                                                    {link.label}
                                                </NavLink>
                                            )
                                        )}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    {/* Animation Toggle Column */}
                    <Box
                        sx={{
                            gridColumn: ['1 / -1', '1 / -1', '1 / 7', '1 / 7'],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: ['flex-start'],
                        }}
                    >
                        <Button
                            onClick={toggleAnimation}
                            sx={{
                                bg: isAnimationEnabled
                                    ? theme.colors?.background
                                    : theme.colors?.secondary,
                                color: isAnimationEnabled
                                    ? theme.colors?.primary
                                    : theme.colors?.primary,
                                fontSize: '14px',
                                py: 2,
                                px: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                ':hover': {
                                    opacity: 0.8,
                                },
                            }}
                        >
                            {isAnimationEnabled
                                ? 'Animation deaktivieren'
                                : 'Animation aktivieren'}
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default Footer;
