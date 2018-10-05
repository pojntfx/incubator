import * as React from "react";
import { Component } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Settings } from "./Settings";

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class Navbar extends Component {
  state = {
    settingsIsOpen: false
  };

  toggleSettings = () =>
    this.setState({
      settingsIsOpen: !this.state.settingsIsOpen
    });

  render() {
    return (
      <NavbarWrapper className="my-3">
        <Button active={this.state.settingsIsOpen} onClick={this.toggleSettings} variant="outline-primary" className="mr-auto">
          Settings
        </Button>
        <Settings
          isOpen={this.state.settingsIsOpen}
          onHide={this.toggleSettings}
        />
        <Button variant="outline-primary" className="ml-auto">
          Logout
        </Button>
      </NavbarWrapper>
    );
  }
}

export { Navbar };
