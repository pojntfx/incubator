import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";

export class MainNavigation extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <MainMenu>
        <Menu.Item
          name="administrators"
          active={activeItem === "administrators"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="users"
          active={activeItem === "users"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="addUser"
            active={activeItem === "addUser"}
            onClick={this.handleItemClick}
          >
            <Icon name="add" />
            Add User
          </Menu.Item>
        </Menu.Menu>
      </MainMenu>
    );
  }
}

const MainMenu = styled(Menu)`
  overflow-x: auto;
`;
