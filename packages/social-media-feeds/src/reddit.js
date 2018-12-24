import fetch from "node-fetch";

class Reddit {
  constructor(userName) {
    this.userName = userName;
  }

  getEvents() {
    return fetch(`https://api.reddit.com/user/${this.userName}`)
      .then(data => data.json())
      .then(data => data.data.children);
  }
}

export { Reddit };
