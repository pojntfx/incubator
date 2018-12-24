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
        return facebook
          .getEvents()
          .then(events =>
            events.sort((a, b) =>
              a.time > b.time ? -1 : a.time < b.time ? 1 : 0
            )
          );
      },
      cache: true
    }
  }
};

export { Facebook };
