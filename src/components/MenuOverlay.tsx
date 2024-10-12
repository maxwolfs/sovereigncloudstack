import React from 'react';
import { Box, Grid, NavLink, Text, useThemeUI } from 'theme-ui';
import TopNavigation from './TopNavigation';
import { useStaticQuery, graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';

interface MenuOverlayProps {
    showOverlay: boolean;
    setShowOverlay: Function;
    logoSrc: string;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
    showOverlay,
    setShowOverlay,
    logoSrc,
}) => {
    const { theme } = useThemeUI();
    const { language } = useI18next();

    const data = useStaticQuery(graphql`
        query MenuOverlayQuery {
            allMarkdownRemark(
                filter: { frontmatter: { component: { eq: "menuOverlay" } } }
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

    const menuContent = data.allMarkdownRemark.nodes.find(
        (node: { frontmatter: { locale: string } }) =>
            node.frontmatter.locale === language
    );

    if (!menuContent) {
        return <div>Error: Menu content is missing!</div>;
    }

    const columns = menuContent.frontmatter.columns;

    if (!showOverlay) {
        return null;
    }

    return (
        <Box
            sx={{
                zIndex: 1000,
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                bg: theme.colors?.background,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 4,
            }}
        >
            <TopNavigation
                logoSrc={logoSrc}
                setShowOverlay={setShowOverlay}
                showOverlay={showOverlay}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    flexGrow: 1,
                    pt: [5, 0, 0, 0],
                }}
            >
                <Grid
                    columns={[1, 3]}
                    gap={[4, 6]}
                    sx={{
                        width: '100%',
                        maxWidth: '1200px',
                        textAlign: 'center',
                        mx: 'auto',
                    }}
                >
                    {columns.map((column: any, colIndex: number) => (
                        <Box key={colIndex}>
                            <Text
                                variant='bold'
                                sx={{ mb: 3, fontSize: [1, 2, 3, 3] }}
                            >
                                {column.title}
                            </Text>
                            {column.links.map((link: any, linkIndex: number) => (
                                <Box key={linkIndex} my={[2, 2, 4, 4]}>
                                    <NavLink
                                        href={link.url}
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        <Text
                                            variant='body'
                                            sx={{
                                                cursor: 'pointer',
                                                color: 'text',
                                                fontSize: [1, 2, 3, 3],
                                            }}
                                        >
                                            {link.label}
                                        </Text>
                                    </NavLink>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                Open Source Business Alliance
            </Box>
        </Box>
    );
};

export default MenuOverlay;
