import * as React from "react";
import { Card } from "react-bootstrap";

const ImageCard = ({ src, alt, lastUpdate }) => (
  <a href={src}>
    <Card>
      <Card.Img variant="top" src={src} alt={alt} />
      <Card.Footer>
        <small className="text-muted">
          Last updated {new Date(lastUpdate).toLocaleString()}
        </small>
      </Card.Footer>
    </Card>
  </a>
);

export { ImageCard };
