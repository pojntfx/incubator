import fetch from "node-fetch";

class Facebook {
  constructor(accessKey, userId) {
    this.accessKey = accessKey;
    this.userId = userId;
  }

  getEvents() {
    return fetch(
      `https://graph.facebook.com/v3.2/${this.userId}/posts?access_token=${
        this.accessKey
      }`
    ).then(data => data.json());
  }
}

export { Facebook };
