import React from "react";
import { Link, graphql } from "gatsby";
import { css } from "react-emotion";
import { rhythm } from "../utils/typography";
import Layout from "../layouts/default";

export default ({
  data: {
    allMarkdownRemark: { totalCount, edges }
  }
}) => {
  return (
    <Layout>
      <div>
        <h1
          className={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          The Panda Blog
        </h1>
        <h4>{totalCount} Posts</h4>
        {edges.map(
          ({
            node: {
              frontmatter: { title, date },
              excerpt,
              id,
              fields: { slug }
            }
          }) => (
            <div key={id}>
              <Link
                to={`/blog${slug}`}
                className={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <h3
                  className={css`
                    margin-bottom: ${rhythm(1 / 4)};
                  `}
                >
                  {title}{" "}
                  <span
                    className={css`
                      color: #bbb;
                    `}
                  >
                    — {date}
                  </span>
                </h3>
                <p>{excerpt}</p>
              </Link>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
