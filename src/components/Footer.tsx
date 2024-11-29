import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Grid, NavLink, useThemeUI, Text } from 'theme-ui';
import { useI18next } from 'gatsby-plugin-react-i18next';

const Footer: React.FC = () => {
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
        <Grid
            columns={[1, 1, 6, 6]}
            gap={[4, 20, 20, 40]}
            sx={{
                alignContent: 'center',
                gridColumn: '1 / -1',
                width: '100%',
                minHeight: '30vh',
                mt: [0, 4, 4, 7],
                py: 3,
                bg: theme.colors?.primary,
                px: ['20px', '20px', '20px', '40px'],

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
            {columns.slice(1).map((column: any, columnIndex: number) => (
                <Box
                    key={columnIndex}
                    sx={{
                        gridColumn: [
                            '1 / -1',
                            '1 / -1',
                            `${columnIndex + 2} / ${columnIndex + 3}`,
                            `${columnIndex + 2} / ${columnIndex + 3}`,
                        ],
                    }}
                >
                    {column.links && (
                        <Box sx={{ display: 'grid' }}>
                            <Box sx={{ mb: 3 }}>
                                <Text
                                    variant='heading'
                                    sx={{ color: theme.colors?.background }}
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
        </Grid>
    );
};

export default Footer;
