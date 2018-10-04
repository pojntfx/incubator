import * as React from "react";
import { CardColumns } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

const ImageList = ({ images }) => (
  <CardColumns>
    {images.map(({ src, alt, lastUpdate }, index) => (
      <ImageCard
        wait={1200} // Let the server respond
        alt={alt}
        src={src}
        lastUpdate={lastUpdate}
        key={index}
      />
    ))}
  </CardColumns>
);

export { ImageList };
