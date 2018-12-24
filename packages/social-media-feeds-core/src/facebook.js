import fetch from "node-fetch";

class Facebook {
  constructor(accessKey, userId) {
    this.accessKey = accessKey;
    this.userId = userId;
  }

  async __getEventsRaw() {
    return fetch(
      `https://graph.facebook.com/v3.2/${this.userId}/posts?access_token=${
        this.accessKey
      }`
    )
      .then(data => data.json())
      .then(data => data.data);
  }

  async getEvents() {
    const events = await this.__getEventsRaw();
    if (Array.isArray(events)) {
      return events.map(event => ({
        actor: this.userId,
        type: "com.facebook.Post",
        payload: {
          text: event.message
        },
        time: new Date(event.created_time).toISOString()
      }));
    } else {
      throw new Error("Invalid Facebook access key!");
    }
  }
}

export { Facebook };
