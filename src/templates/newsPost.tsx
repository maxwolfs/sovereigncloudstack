import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

interface NewsPostProps {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string;
                date: string;
                language: string;
                authors: Array<{ name: string; image: any }>;
                cover_image: any;
            };
            html: string;
        };
    };
}

const NewsPost: React.FC<NewsPostProps> = ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;

    const coverImage = getImage(frontmatter.cover_image);

    return (
        <article>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
            {coverImage && (
                <GatsbyImage
                    image={coverImage}
                    alt={`Cover image for ${frontmatter.title}`}
                />
            )}
            <div>
                <h3>Authors:</h3>
                <ul>
                    {frontmatter.authors.map((author, index) => (
                        <li key={index}>
                            <img
                                src={author.image}
                                alt={author.name}
                                style={{ width: '50px' }}
                            />
                            <span>{author.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
    );
};

export const query = graphql`
    query ($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                language
                authors {
                    name
                    image
                }
                cover_image {
                    childImageSharp {
                        gatsbyImageData(layout: CONSTRAINED)
                    }
                }
            }
            html
        }
    }
`;

export default NewsPost;
