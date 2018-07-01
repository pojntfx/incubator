import React from "react";
import Layout from "../layouts/default";
import { graphql } from "gatsby";

export default ({
  data: {
    allFile: { edges }
  }
}) => {
  return (
    <Layout>
      <h1>My Site's Files</h1>
      <table>
        <thead>
          <tr>
            <th>relativePath</th>
            <th>prettySize</th>
            <th>extension</th>
            <th>birthTime</th>
          </tr>
        </thead>
        <tbody>
          {edges.map(
            (
              { node: { relativePath, prettySize, extension, birthTime } },
              index
            ) => (
              <tr key={index}>
                <td>{relativePath}</td>
                <td>{prettySize}</td>
                <td>{extension}</td>
                <td>{birthTime}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export const query = graphql`
  query MyFilesQuery {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
