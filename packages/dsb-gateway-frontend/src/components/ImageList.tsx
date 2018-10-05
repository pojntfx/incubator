import * as React from "react";
import { CardColumns } from "react-bootstrap";
import { ImageCard } from "./ImageCard";

interface IImageListProps {
  images: IImageListPropsImage[];
  children: any;
}

interface IImageListPropsImage {
  src: string;
  alt: string;
  lastUpdate: string;
}

const ImageList = ({ images, children }: IImageListProps) => (
  <CardColumns>
    {images.map(({ src, alt, lastUpdate }, index) =>
      children({ src, alt, lastUpdate, index })
    )}
  </CardColumns>
);

export { ImageList };
