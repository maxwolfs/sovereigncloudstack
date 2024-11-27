import path from 'path';
import { GatsbyNode } from 'gatsby';

// Typdefinition für die GraphQL-Antwort
interface MarkdownNode {
    id: string;
    frontmatter: {
        type: string;
        slug: string;
        language: string;
    };
}

interface GraphQLResult {
    data?: {
        allMarkdownRemark: {
            nodes: MarkdownNode[];
        };
    };
    errors?: any;
}

// GatsbyNode-Implementierung
export const createPages: GatsbyNode['createPages'] = async ({
    graphql,
    actions,
}) => {
    const { createPage } = actions;

    const result: GraphQLResult = await graphql(`
        query FetchAllMarkdownData {
            allMarkdownRemark {
                nodes {
                    id
                    frontmatter {
                        type
                        slug
                        language
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(width: 800)
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        throw new Error('Error loading Markdown files: ' + result.errors);
    }

    const items = result.data?.allMarkdownRemark.nodes;

    if (!items || items.length === 0) {
        console.warn('No Markdown files found.');
        return;
    }

    // Iteriere durch alle Markdown-Knoten und erstelle Seiten
    items.forEach((node) => {
        const { type, slug, language } = node.frontmatter;

        let templatePath: string;
        switch (type) {
            case 'announcements':
                templatePath = path.resolve(
                    './src/templates/announcementPost.tsx'
                );
                break;
            case 'blog':
                templatePath = path.resolve(
                    './src/templates/announcementPost.tsx'
                );
                break;
            case 'event':
                templatePath = path.resolve('./src/templates/eventPost.tsx');
                break;
            default:
                console.warn(
                    `Unknown type "${type}" for item with slug "${slug}". Skipping...`
                );
                return;
        }

        // let pagePath = `/${slug}`;
        // if (language === 'de') {
        //     pagePath = `/de/${slug}`;
        // }

        createPage({
            path: `/${type}/${slug}`, // Beispiel: /de/news/osba-forum-scs-standards
            component: templatePath,
            context: {
                id: node.id,
                language,
            },
        });
    });
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
    ({ actions }) => {
        const { createTypes } = actions;

        createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      title: String
      date: Date @dateformat
      language: String
      type: String
      slug: String
      featuredImage: File @fileByRelativePath
      authors: [Author]
    }

    type Author {
      name: String
      image: File @fileByRelativePath
    }
  `);
    };
