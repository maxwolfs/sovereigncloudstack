import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Box, Grid, NavLink, Text, useThemeUI } from 'theme-ui';
import { useI18next } from 'gatsby-plugin-react-i18next';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
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
        <>
            <Grid
                columns={[1, 4, 6, 6]}
                gap={[4, 20, 20, 40]}
                sx={{
                    alignContent: 'center',
                    gridColumn: '1 / -1',
                    width: '100%',
                    minHeight: '50vh',
                    mt: [0, 4, 4, 7],
                    py: 3,
                    bg: theme.colors?.primary,
                    px: ['20px', '20px', '20px', '40px'],
                }}
            >
                {columns.map((column: any, columnIndex: number) => (
                    <Box
                        key={columnIndex}
                        sx={{
                            gridColumn: [
                                '1 / -1',
                                `${columnIndex + 1} / ${columnIndex + 2}`,
                                `${columnIndex + 1} / ${columnIndex + 2}`,
                                `${columnIndex + 1} / ${columnIndex + 2}`,
                            ],
                        }}
                    >
                        {columns[columnIndex]?.links && (
                            <Box sx={{ display: 'grid' }}>
                                {column.links.map((link: any, linkIndex: number) => (
                                    <Text
                                        key={linkIndex}
                                        variant='whiteBody'
                                        sx={{ fontSize: [1, 2, 2, 2] }}
                                    >
                                        <NavLink
                                            href={link.url}
                                            sx={{ textDecoration: 'none' }}
                                        >
                                            {link.label}
                                        </NavLink>
                                    </Text>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}
            </Grid>
        </>
    );
};

export default Footer;
