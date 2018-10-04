import * as React from "react";
import { Container, Card, CardColumns } from "react-bootstrap";
import { Navbar } from "./Navbar";

const ImgCard = ({ url, lastUpdate }) => (
  <a href={url}>
    <Card className="bg-primary text-white">
      <Card.Img src={url} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Text>Last updated {lastUpdate}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  </a>
);

const App = () => (
  <Container>
    <Navbar />
    <CardColumns>
      <ImgCard
        url="https://images.unsplash.com/photo-1538593315427-b14435fc9d3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3058532fd7e4f7ef35b4c159890cf82e&auto=format&fit=crop&w=400&h=400"
        lastUpdate="3 mins ago"
      />
    </CardColumns>
  </Container>
);

export { App };
