import fetch from "node-fetch";

class GitHub {
  constructor(userName) {
    this.userName = userName;
  }

  async __getEventsRaw() {
    return fetch(`https://api.github.com/users/${this.userName}/events`).then(
      data => data.json()
    );
  }

  async getEvents() {
    const events = await this.__getEventsRaw();
    return events.map(event => ({
      actor: event.actor.login,
      type: event.type,
      payload:
        event.type === "WatchEvent"
          ? {
              text: `Starred ${event.repo.name}`
            }
          : event.type === "IssueCommentEvent"
          ? {
              text: `Add comment on issue in ${event.repo.name}`
            }
          : event.type === "IssuesEvent"
          ? {
              text: `Added issue to ${event.repo.name}`
            }
          : {
              text: `Pushed to ${event.repo.name}`
            }
    }));
  }
}

export { GitHub };
