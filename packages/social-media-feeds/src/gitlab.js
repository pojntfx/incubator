import fetch from "node-fetch";

class GitLab {
  constructor(userId, apiUrl) {
    this.userId = userId;
    this.apiUrl = apiUrl;
  }

  getEvents() {
    return fetch(
      `https://${this.apiUrl}/api/v4/users/${this.userId}/events`
    ).then(data => data.json());
  }
}

export { GitLab };
