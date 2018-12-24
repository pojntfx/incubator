import InstagramClient from "insta-api";

class Instagram {
  constructor(sessionId, userName) {
    this.sessionId = sessionId;
    this.userName = userName;
    this.fetch = new InstagramClient(sessionId);
  }

  async __getEventsRaw() {
    return this.fetch.getPosts(this.userName).then(data => data.posts);
  }

  async getEvents() {
    const events = await this.__getEventsRaw();
    if (Array.isArray(events)) {
      return events.map(event => ({
        actor: event.owner.username,
        type: "com.instagram.Post",
        payload: {
          text: event.caption,
          media: event.display_url,
          url: event.url
        }
      }));
    } else {
      throw new Error("Invalid Instagram session id!");
    }
  }

  async __getStoriesRaw() {
    return this.fetch.getStories(this.userName).then(data => data.stories);
  }

  async getStories() {
    const stories = await this.__getStoriesRaw();
    if (Array.isArray(stories)) {
      return stories.map(story => ({
        actor: story.owner.username,
        type: "com.instagram.Story",
        payload: {
          media: story.display_url,
          url: story.url
        }
      }));
    } else {
      throw new Error("Invalid Instagram session id!");
    }
  }
}

export { Instagram };
