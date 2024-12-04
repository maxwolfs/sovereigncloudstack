import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../components/Layout';
import { Box, Text, useThemeUI } from 'theme-ui';

interface CustomPageContext {
    language: string;
}

type StaticPageQueryData = {
    markdownRemark: {
        frontmatter: {
            title: string;
            enableAnimation?: boolean;
        };
        html: string;
    };
};

const StaticPage: React.FC<
    PageProps<StaticPageQueryData, CustomPageContext>
    > = ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;
    const { theme } = useThemeUI();
    return (
        <Layout
            pageContext={{
                frontmatter: {
                    enableAnimation: frontmatter.enableAnimation ?? true, // Default-Wert
                },
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px',
                }}
            >
                <Box mb={5}>
                    <Text
                        variant='heading'
                        sx={{
                            fontSize: [6, 7, 7, 8],
                        }}
                    >
                        {frontmatter.title}
                    </Text>
                </Box>
                <Box
                    sx={{
                        background: theme.colors?.background,
                        maxWidth: 800
                    }}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </Layout>
    );
};

export const query = graphql`
    query StaticPageQuery($slug: String!, $language: String!) {
        markdownRemark(
            frontmatter: { slug: { eq: $slug }, language: { eq: $language } }
        ) {
            frontmatter {
                title
                enableAnimation
            }
            html
        }
    }
`;

export default StaticPage;
