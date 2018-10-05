import * as React from "react";
import { Component } from "react";
import { Card } from "react-bootstrap";
import { Loading } from "./Loading";

interface IImageCardProps {
  src: string;
  alt: string;
  lastUpdate: string;
  wait: number;
  loading: any;
}

class ImageCard extends Component<IImageCardProps> {
  state = { visible: false };

  componentDidMount = () =>
    setTimeout(() => {
      this.show();
    }, this.props.wait);

  show = () => this.setState({ visible: true });

  render = () => (
    <a href={this.props.src}>
      <Card>
        {this.state.visible ? (
          <Card.Img variant="top" src={this.props.src} alt={this.props.alt} />
        ) : (
          this.props.loading()
        )}
        <Card.Footer>
          <small className="text-muted">
            Last updated {new Date(this.props.lastUpdate).toLocaleString()}
          </small>
        </Card.Footer>
      </Card>
    </a>
  );
}

export { ImageCard };
