import * as React from "react";
import { Component } from "react";
import { Container, Button } from "react-bootstrap";
import Fetch from "react-fetch-component";
import { Navbar } from "./Navbar";
import { ImageList } from "./ImageList";
import low from "lowdb";
import { Error } from "./Error";
import { Warning } from "./Warning";
import { Settings } from "./Settings";

const transformToImageList = rawList =>
  rawList.map(({ url, fileName, lastUpdate }) => ({
    src: url,
    alt: fileName,
    lastUpdate
  }));

interface IApp {
  db: low;
}

const getEndpoint = (
  listEndpoint,
  dsbEndpoint,
  staticEndpoint,
  username,
  password
) =>
  `${listEndpoint}?endpoint=${dsbEndpoint}&staticendpoint=${staticEndpoint}&username=${username}&password=${password}`;

class App extends Component<IApp> {
  state = {
    settingsAreOpen: true,
    data: {
      settingsAreOpen: "",
      username: "",
      password: "",
      listEndpoint: "",
      staticEndpoint: "",
      dsbEndpoint: ""
    }
  };

  componentDidMount() {
    this.setState({
      settingsAreOpen: this.props.db.read().__wrapped__.settingsAreOpen,
      data: this.props.db.read().__wrapped__
    });
  }

  toggleSettings = () => {
    this.props.db.set("settingsAreOpen", false).write();
    this.setState({
      settingsAreOpen: !this.state.settingsAreOpen
    });
  };

  handleSave = data => {
    this.setState({
      data
    });
    this.props.db.set("endpoint", data.endpoint).write();
    this.props.db.set("listEndpoint", data.listEndpoint).write();
    this.props.db.set("dsbEndpoint", data.dsbEndpoint).write();
    this.props.db.set("staticEndpoint", data.staticEndpoint).write();
    this.props.db.set("username", data.username).write();
    this.props.db.set("password", data.password).write();
  };

  render() {
    const endpoint = getEndpoint(
      this.state.data.listEndpoint,
      this.state.data.dsbEndpoint,
      this.state.data.staticEndpoint,
      this.state.data.username,
      this.state.data.password
    );

    const { settingsAreOpen, data } = this.state;

    return (
      <Container>
        <Navbar>
          <Button
            active={settingsAreOpen}
            onClick={this.toggleSettings}
            variant="outline-primary"
            className="mr-auto"
          >
            Settings
          </Button>
          <Settings
            data={data}
            areOpen={settingsAreOpen}
            onHide={this.toggleSettings}
            onSave={this.handleSave}
          />
        </Navbar>
        {settingsAreOpen ? null : (
          <Fetch url={endpoint}>
            {({ loading, error, data }) => (
              <>
                {loading && <Warning endpoint={endpoint} />}
                {error && (
                  <Error
                    message="Oh no, an error occured!"
                    supportLink="https://www.twitter.com/@pojntfx"
                    supportPerson="Felicitas Pojtinger"
                    error={error}
                  />
                )}
                {data && <ImageList images={transformToImageList(data)} />}
              </>
            )}
          </Fetch>
        )}
      </Container>
    );
  }
}

export { App };
