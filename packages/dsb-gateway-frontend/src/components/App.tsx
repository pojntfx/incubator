import * as React from "react";
import { Container, Alert } from "react-bootstrap";
import Fetch from "react-fetch-component";
import { Navbar } from "./Navbar";
import { ImageList } from "./ImageList";

const transformToImageList = rawList =>
  rawList.map(({ url, fileName, lastUpdate }) => ({
    src: url,
    alt: fileName,
    lastUpdate
  }));

const App = ({ endpoint }) => (
  <Container>
    <Navbar />
    <Fetch url={endpoint}>
      {({ loading, error, data }) => (
        <div>
          {loading && (
            <Alert variant="info">
              <b>Loading ...</b> <br />
              DSB gateway API endpoint: {endpoint}
            </Alert>
          )}
          {error && (
            <Alert variant="danger">
              <b>Oh no, an error occured!</b> Report this to{" "}
              <a href="https://www.twitter.com/@pojntfx">Felix Pojtinger</a> :
              <br /> {error.toString()}
            </Alert>
          )}
          {data && <ImageList images={transformToImageList(data)} />}
        </div>
      )}
    </Fetch>
  </Container>
);

export { App };
