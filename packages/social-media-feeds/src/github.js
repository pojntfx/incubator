import fetch from "node-fetch";

class GitHub {
  constructor(userName) {
    this.userName = userName;
  }

  getEvents() {
    return fetch(`https://api.github.com/users/${this.userName}/events`).then(
      data => data.json()
    );
  }
}

export { GitHub };
