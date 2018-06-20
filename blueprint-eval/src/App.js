import React, { Component } from "react";
import {
  Button,
  Alert,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Alignment,
  NavbarDivider
} from "@blueprintjs/core";

export default class App extends Component {
  state = {
    alertIsOpen: false
  };

  toggleDialog = () =>
    this.setState({
      alertIsOpen: !this.state.alertIsOpen
    });

  render() {
    return (
      <div>
        {/* Navbar */}
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Blueprint</NavbarHeading>
            <NavbarDivider />
            <Button className="pt-minimal" icon="home" text="Home" />
            <Button className="pt-minimal" icon="document" text="Files" />
          </NavbarGroup>
        </Navbar>
        {/* Button */}
        <Button icon="add" text="Open dialog" onClick={this.toggleDialog} />
        {/* Alert */}
        <Alert
          icon="info-sign"
          isOpen={this.state.alertIsOpen}
          onCancel={this.toggleDialog}
          onClose={this.toggleDialog}
          confirmButtonText="Oh, hell yeah!"
          cancelButtonText="Nah ..."
          canEscapeKeyCancel={true}
          canOutsideClickCancel={true}
          intent="success"
        >
          Stay awesome?
        </Alert>
      </div>
    );
  }
}
