import path from 'path';
import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({
    actions,
    graphql,
    reporter,
}) => {
    const { createPage } = actions;

    const result = await graphql<{
        allMarkdownRemark: {
            nodes: Array<{
                frontmatter: {
                    slug: string | null;
                    language: string | null;
                    type: string | null;
                };
            }>;
        };
    }>(`
        query FetchAllMarkdown {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        slug
                        language
                        type
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild('Error fetching markdown data', result.errors);
        return;
    }

    const posts = result.data?.allMarkdownRemark.nodes ?? [];

    posts.forEach((node, index) => {
        const { slug, language, type } = node.frontmatter;

        if (!slug || !language || !type) {
            reporter.warn(
                `Skipping creation for node #${index}: Missing slug, language, or type. Data: ${JSON.stringify(
                    node.frontmatter
                )}`
            );
            return;
        }

        let template = '';
        if (type === 'news') {
            template = path.resolve('./src/templates/newsPost.tsx');
        } else if (type === 'event') {
            template = path.resolve('./src/templates/eventPost.tsx');
        } else if (type === 'blog') {
            template = path.resolve('./src/templates/blogPost.tsx');
        } else {
            reporter.warn(`Unknown type "${type}" for node: ${slug}`);
            return;
        }

        let pagePath = `/${slug}`; 
        if (language === 'de') {
            pagePath = `/de/${slug}`;
        }

        createPage({
            path: pagePath,
            component: template,
            context: {
                slug,
                language,
            },
        });

        reporter.info(`Created page at ${pagePath}`);
    });
};
