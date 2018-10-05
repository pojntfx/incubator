import * as React from "react";
import { Component } from "react";
import { Form, Button, Collapse, Modal, Row, Col } from "react-bootstrap";

interface ISettings {
  data: any;
  areOpen: boolean;
  onHide: any;
  onSave: any;
}

class Settings extends Component<ISettings> {
  state = {
    advancedSettings: false,
    username: "",
    password: "",
    listEndpoint: "",
    staticEndpoint: "",
    dsbEndpoint: ""
  };

  toggleAdvancedSettings = () =>
    this.setState({
      advancedSettings: !this.state.advancedSettings
    });

  handleUsernameChange = event =>
    this.setState({
      username: event.target.value
    });

  handlePasswordChange = event =>
    this.setState({
      password: event.target.value
    });

  handleListEndpointChange = event =>
    this.setState({
      listEndpoint: event.target.value
    });

  handleStaticEndpointChange = event =>
    this.setState({
      staticEndpoint: event.target.value
    });

  handleDsbEndpointChange = event =>
    this.setState({
      dsbEndpoint: event.target.value
    });

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSave({
      username: this.state.username || this.props.data.username,
      password: this.state.password || this.props.data.password,
      listEndpoint: this.state.listEndpoint || this.props.data.listEndpoint,
      staticEndpoint:
        this.state.staticEndpoint || this.props.data.staticEndpoint,
      dsbEndpoint: this.state.dsbEndpoint || this.props.data.dsbEndpoint
    });
  };

  render() {
    return (
      <Modal
        show={this.props.areOpen}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="2342383"
                onChange={this.handleUsernameChange}
                value={
                  this.state.username !== ""
                    ? this.state.username
                    : this.props.data.username
                }
              />
              <Form.Text className="text-muted">
                The username for the DSB your school has provided you with.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="supersecurepassword"
                onChange={this.handlePasswordChange}
                value={
                  this.state.password !== ""
                    ? this.state.password
                    : this.props.data.password
                }
              />
              <Form.Text className="text-muted">
                The password for the DSB your school has provided you with.
              </Form.Text>
            </Form.Group>
            <Button
              variant="outline-primary"
              onClick={this.toggleAdvancedSettings}
              active={this.state.advancedSettings}
            >
              {this.state.advancedSettings
                ? "Hide advanced settings"
                : "Show advanced settings"}
            </Button>
            <Collapse in={this.state.advancedSettings}>
              <div className="mt-3">
                <Form.Group controlId="formDSBGatewayListEndpoint">
                  <Form.Label>DSB Gateway's List Endpoint</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://localhost:3000/list"
                    onChange={this.handleListEndpointChange}
                    value={
                      this.state.listEndpoint !== ""
                        ? this.state.listEndpoint
                        : this.props.data.listEndpoint
                    }
                  />
                  <Form.Text className="text-muted">
                    The endpoint (URL) of the DSB Gateway instance's list you
                    are using.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formDSBGatewayStaticEndpoint">
                  <Form.Label>DSB Gateway's Static Endpoint</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://localhost:4000"
                    onChange={this.handleStaticEndpointChange}
                    value={
                      this.state.staticEndpoint !== ""
                        ? this.state.staticEndpoint
                        : this.props.data.staticEndpoint
                    }
                  />
                  <Form.Text className="text-muted">
                    The endpoint (URL) of the DSB Gateway instance's static
                    server (the one that serves the images) you are using.
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  controlId="formDSBEndpoint"
                  onChange={this.handleDsbEndpointChange}
                >
                  <Form.Label>DSB's Endpoint</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://www.dsbmobile.de/Login.aspx"
                    onChange={this.handleDsbEndpointChange}
                    value={
                      this.state.dsbEndpoint !== ""
                        ? this.state.dsbEndpoint
                        : this.props.data.dsbEndpoint
                    }
                  />
                  <Form.Text className="text-muted">
                    The endpoint (URL) of the login page to the proprietary DSB
                    service.
                  </Form.Text>
                </Form.Group>
              </div>
            </Collapse>
            <Row className="mt-3">
              <Col sm={12} lg="auto" className="mb-3 mb-lg-0">
                <Button
                  variant="success"
                  size="block"
                  onClick={this.props.onHide}
                  type="submit"
                >
                  Save changes to settings
                </Button>
              </Col>
              <Col sm={12} lg="auto">
                <Button
                  variant="danger"
                  size="block"
                  onClick={this.props.onHide}
                >
                  Discard changes to settings
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export { Settings };
