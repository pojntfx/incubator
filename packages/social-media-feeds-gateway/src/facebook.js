import { Facebook as FacebookClient } from "@pojntfx-incubator/social-media-feeds-core";

const Facebook = {
  name: "facebook",
  actions: {
    get: {
      params: {
        accessKey: "string",
        userId: "string"
      },
      handler: async ctx => {
        const facebook = new FacebookClient(
          ctx.params.accessKey,
          ctx.params.userId
        );
        return facebook.getEvents();
      }
    }
  }
};

export { Facebook };
