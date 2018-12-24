import fetch from "node-fetch";

class GitLab {
  constructor(userName, url) {
    this.userName = userName;
    this.url = url;
  }

  async __getEventsRaw() {
    return fetch(
      `https://${this.url}/api/v4/users/${this.userName}/events`
    ).then(data => data.json());
  }

  async getEvents() {
    const events = await this.__getEventsRaw();
    return events.map(event => ({
      actor: event.author.username,
      type: `com.gitlab.${event.action_name}`,
      payload: {
        title: event.push_data.commit_title,
        text: event.push_data.commit_description
      }
    }));
  }
}

export { GitLab };
