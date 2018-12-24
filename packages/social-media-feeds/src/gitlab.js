import fetch from "node-fetch";

class GitLab {
  constructor(userName, url) {
    this.userName = userName;
    this.url = url;
  }

  getEvents() {
    return fetch(
      `https://${this.url}/api/v4/users/${this.userName}/events`
    ).then(data => data.json());
  }
}

export { GitLab };
