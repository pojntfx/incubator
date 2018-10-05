import * as React from "react";
import { Component } from "react";
import { Card } from "react-bootstrap";

interface IImageCardProps {
  src: string;
  alt: string;
  lastUpdate: string;
  wait: number;
}

class ImageCard extends Component<IImageCardProps> {
  state = { visible: false };

  componentDidMount = () =>
    setTimeout(() => {
      this.show();
    }, this.props.wait);

  show = () => this.setState({ visible: true });

  render = () =>
    this.state.visible ? (
      <a href={this.props.src}>
        <Card>
          <Card.Img variant="top" src={this.props.src} alt={this.props.alt} />
          <Card.Footer>
            <small className="text-muted">
              Last updated {new Date(this.props.lastUpdate).toLocaleString()}
            </small>
          </Card.Footer>
        </Card>
      </a>
    ) : (
      false
    );
}

export { ImageCard };
