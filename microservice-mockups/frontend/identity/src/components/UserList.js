import React, { Component } from "react";

import { Segment, Button } from "semantic-ui-react";

export class UserList extends Component {
  state = {
    users: []
  };

  constructor() {
    super();
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  async fetchAllUsers() {
    try {
      const res = await fetch("http://localhost:4000/users");
      const users = await res.json();
      this.setState({ users });
      this.forceUpdate();
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    return this.state.users.map(
      ({ id, email, publicKey, meta: { fullName } }, index) => (
        <Segment key={index}>
          <h1>{fullName}</h1>
          <h2>{email}</h2>
          <p>{publicKey}</p>
          <DeleteButton id={id} onDeletion={this.fetchAllUsers} />
        </Segment>
      )
    );
  }
}

class DeleteButton extends Component {
  delete = () => {
    try {
      fetch(`http://localhost:4000/users/${this.props.id}`, {
        method: "DELETE"
      }).then(response => this.props.onDeletion());
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    return (
      <Button onClick={this.delete} color="red">
        Delete
      </Button>
    );
  }
}
