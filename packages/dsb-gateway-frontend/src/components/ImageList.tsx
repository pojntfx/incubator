import * as React from "react";
import { CardColumns } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

const ImageList = ({ images }) =>
  images.map(({ src, lastUpdate }, index) => (
    <CardColumns key={index}>
      <ImageCard src={src} lastUpdate={lastUpdate} />
    </CardColumns>
  ));

export { ImageList };
