import * as React from "react";
import { Container, Card, CardColumns } from "react-bootstrap";
import { Navbar } from "./Navbar";
import { ImageList } from "./ImageList";

const images = [
  {
    src:
      "https://images.unsplash.com/photo-1538593315427-b14435fc9d3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3058532fd7e4f7ef35b4c159890cf82e&auto=format&fit=crop&w=400&h=400",
    lastUpdate: "3 mins ago"
  }
];

const App = () => (
  <Container>
    <Navbar />
    <ImageList images={images} />
  </Container>
);

export { App };
