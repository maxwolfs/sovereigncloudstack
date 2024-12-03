import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../components/Layout';
import { Box, Text } from 'theme-ui';

interface CustomPageContext {
    language: string;
}

type StaticPageQueryData = {
    markdownRemark: {
        frontmatter: {
            title: string;
        };
        html: string;
    };
};

const StaticPage: React.FC<
    PageProps<StaticPageQueryData, CustomPageContext>
> = ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;

    return (
        <Layout>
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
                <div dangerouslySetInnerHTML={{ __html: html }} />
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
            }
            html
        }
    }
`;

export default StaticPage;
