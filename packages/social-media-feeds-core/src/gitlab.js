import fetch from "node-fetch";

// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case#2970667
async function pascalize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return match.toUpperCase();
  });
}

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
    return Promise.all(
      events.map(async event => ({
        actor: event.author.username,
        type: `com.gitlab.${await pascalize(event.action_name)}`,
        payload: {
          title: event.push_data.commit_title,
          text: event.push_data.commit_description
        }
      }))
    );
  }
}

export { GitLab };
