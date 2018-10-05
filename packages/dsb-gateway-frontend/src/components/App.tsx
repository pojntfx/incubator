import * as React from "react";
import { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import Fetch from "react-fetch-component";
import { Navbar } from "./Navbar";
import { ImageList } from "./ImageList";
import low from "lowdb";

const transformToImageList = rawList =>
  rawList.map(({ url, fileName, lastUpdate }) => ({
    src: url,
    alt: fileName,
    lastUpdate
  }));

interface IApp {
  db: low;
}

class App extends Component<IApp> {
  state = {
    settingsAreOpen: true,
    endpoint: ""
  };

  componentDidMount() {
    const {
      settingsAreOpen,
      username,
      password,
      listEndpoint,
      staticEndpoint,
      dsbEndpoint
    } = this.props.db.read().__wrapped__;
    this.setState({
      settingsAreOpen,
      endpoint: `${listEndpoint}?endpoint=${dsbEndpoint}&staticendpoint=${staticEndpoint}&username=${username}&password=${password}`
    });
  }

  toggleSettings = () => {
    this.props.db.set("settingsAreOpen", false).write();
    this.setState({
      settingsAreOpen: !this.state.settingsAreOpen
    });
  };

  render() {
    return (
      <Container>
        <Navbar
          settingsIsOpen={this.state.settingsAreOpen}
          onToggleSettings={this.toggleSettings}
        />
        <Fetch url={this.state.endpoint}>
          {({ loading, error, data }) => (
            <div>
              {loading && (
                <Alert variant="info">
                  <b>Loading ...</b> <br />
                  DSB Gateway API Endpoint:{" "}
                  <a href={this.state.endpoint}>{this.state.endpoint}</a>
                </Alert>
              )}
              {error && (
                <Alert variant="danger">
                  <b>Oh no, an error occured!</b> Report this to{" "}
                  <a href="https://www.twitter.com/@pojntfx">Felix Pojtinger</a>{" "}
                  :<br /> {error.toString()}
                </Alert>
              )}
              {data && <ImageList images={transformToImageList(data)} />}
            </div>
          )}
        </Fetch>
      </Container>
    );
  }
}

export { App };
