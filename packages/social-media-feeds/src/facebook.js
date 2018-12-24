import fetch from "node-fetch";

class Facebook {
  constructor(accessToken, userId) {
    this.accessToken = accessToken;
    this.userId = userId;
  }

  getEvents() {
    return fetch(
      `https://graph.facebook.com/v3.2/${this.userId}/posts?access_token=${
        this.accessToken
      }`
    ).then(data => data.json());
  }
}

export { Facebook };
