import * as React from "react";
import { Card } from "react-bootstrap";

const ImageCard = ({ src, lastUpdate }) => (
  <a href={src}>
    <Card className="bg-primary text-white">
      <Card.Img src={src} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Text>Last updated {lastUpdate}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  </a>
);

export { ImageCard };
