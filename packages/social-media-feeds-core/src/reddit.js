import fetch from "node-fetch";

class Reddit {
  constructor(userName) {
    this.userName = userName;
  }

  async __getEventsRaw() {
    return fetch(`https://api.reddit.com/user/${this.userName}`)
      .then(data => data.json())
      .then(data => data.data.children.map(data => data.data));
  }

  async getEvents() {
    const events = await this.__getEventsRaw();
    return events.map(event => ({
      actor: event.author,
      type: event.is_submitter ? "com.reddit.Post" : "com.reddit.Vote",
      payload: {
        media: event.link_url,
        title: event.link_title,
        text: event.body,
        url: event.link_permalink
      }
    }));
  }
}

export { Reddit };
