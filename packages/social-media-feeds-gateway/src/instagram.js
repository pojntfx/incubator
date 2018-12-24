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
        return instagram.getStories();
      },
      cache: true
    }
  }
};

export { Instagram };
