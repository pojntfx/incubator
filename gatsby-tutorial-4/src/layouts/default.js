import React from "react";
import { css } from "react-emotion";
import { Link, StaticQuery, graphql } from "gatsby";

import { rhythm } from "../utils/typography";

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title }
      }
    }) => (
      <div
        className={css`
          margin: 0 auto;
          max-width: 700px;
          padding: ${rhythm(2)};
          padding-top: ${rhythm(1.5)};
        `}
      >
        <Link to={`/`}>
          <h3
            className={css`
              margin-bottom: ${rhythm(2)};
              display: inline-block;
              font-style: normal;
            `}
          >
            {title}
          </h3>
        </Link>
        <Link
          to={`/my-files/`}
          className={css`
            float: right;
          `}
        >
          My Files
        </Link>
        <Link
          to={`/about/`}
          className={css`
            float: right;
            margin-right: ${rhythm(1)};
          `}
        >
          About
        </Link>
        <Link
          to={`/blog/`}
          className={css`
            float: right;
            margin-right: ${rhythm(1)};
          `}
        >
          Blog
        </Link>
        {children}
      </div>
    )}
  />
);
