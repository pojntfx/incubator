import * as React from "react";
import { Component } from "react";
import { Form, Button, Collapse, Modal } from "react-bootstrap";

interface ISettings {
  isOpen: boolean;
  onHide: any;
}

class Settings extends Component<ISettings> {
  state = {
    advancedSettings: false
  };

  toggleAdvancedSettings = () =>
    this.setState({
      advancedSettings: !this.state.advancedSettings
    });

  render() {
    return (
      <Modal
        show={this.props.isOpen}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="2342383" />
              <Form.Text className="text-muted">
                The username for the DSB your school has provided you with.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="supersecurepassword" />
              <Form.Text className="text-muted">
                The password for the DSB your school has provided you with.
              </Form.Text>
            </Form.Group>
            <Button
              variant="outline-primary"
              onClick={this.toggleAdvancedSettings}
            >
              {this.state.advancedSettings
                ? "Hide advanced settings"
                : "Show advanced settings"}
            </Button>
            <Collapse in={this.state.advancedSettings}>
              <div>
                <Form.Group controlId="formDSBGatewayListEndpoint" className="mt-3">
                  <Form.Label>DSB Gateway's List Endpoint</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://localhost:3000/list"
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
                  />
                  <Form.Text className="text-muted">
                    The endpoint (URL) of the DSB Gateway instance's static
                    server (the one that serves the images) you are using.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formDSBEndpoint">
                  <Form.Label>DSB's Endpoint</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://www.dsbmobile.de/Login.aspx"
                  />
                  <Form.Text className="text-muted">
                    The endpoint (URL) of the login page to the proprietary DSB
                    service.
                  </Form.Text>
                </Form.Group>
              </div>
            </Collapse>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export { Settings };
