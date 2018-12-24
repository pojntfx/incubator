import { Instagram as InstagramClient } from "@pojntfx-incubator/social-media-feeds-core";

const Instagram = {
  name: "instagram",
  actions: {
    get: {
      params: {
        sessionId: "string",
        userName: "string"
      },
      handler: async ctx => {
        const instagram = new InstagramClient(
          ctx.params.sessionId,
          ctx.params.userName
        );
        return instagram.getEvents();
      },
      cache: true
    },
    getStories: {
      params: {
        sessionId: "string",
        userName: "string"
      },
      handler: async ctx => {
        const instagram = new InstagramClient(
          ctx.params.sessionId,
          ctx.params.userName
        );
        return instagram
          .getStories()
          .then(stories =>
            stories.sort((a, b) =>
              a.time > b.time ? -1 : a.time < b.time ? 1 : 0
            )
          );
      },
      cache: true
    }
  }
};

export { Instagram };
