import InstagramClient from "insta-api";

class Instagram {
  constructor(sessionId, userName) {
    this.sessionId = sessionId;
    this.userName = userName;
    this.fetch = new InstagramClient(sessionId);
  }

  getEvents() {
    return this.fetch.getPosts(this.userName);
  }

  getStories() {
    return this.fetch.getStories(this.userName);
  }
}

export { Instagram };
