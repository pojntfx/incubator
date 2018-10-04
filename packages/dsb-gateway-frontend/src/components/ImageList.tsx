import * as React from "react";
import { CardColumns } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

const ImageList = ({ images }) => (
  <CardColumns>
    {images.map(({ src, alt, lastUpdate }, index) => (
      <ImageCard alt={alt} src={src} lastUpdate={lastUpdate} key={index} />
    ))}
  </CardColumns>
);

export { ImageList };
