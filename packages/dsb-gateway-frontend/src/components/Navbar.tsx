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

interface INavbar {
  settingsIsOpen: boolean;
  onToggleSettings: any;
}

class Navbar extends Component<INavbar> {
  render() {
    return (
      <NavbarWrapper className="my-3">
        <Button
          active={this.props.settingsIsOpen}
          onClick={this.props.onToggleSettings}
          variant="outline-primary"
          className="mr-auto"
        >
          Settings
        </Button>
        <Settings
          isOpen={this.props.settingsIsOpen}
          onHide={this.props.onToggleSettings}
        />
        <Button variant="outline-primary" className="ml-auto">
          Logout
        </Button>
      </NavbarWrapper>
    );
  }
}

export { Navbar };
