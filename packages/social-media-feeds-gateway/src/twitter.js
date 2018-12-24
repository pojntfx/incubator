import { Twitter as TwitterClient } from "@pojntfx-incubator/social-media-feeds-core";

const Twitter = {
  name: "twitter",
  actions: {
    get: {
      params: {
        apiKey: "string",
        apiSecretKey: "string",
        userName: "string"
      },
      handler: async ctx => {
        const twitter = new TwitterClient(
          ctx.params.apiKey,
          ctx.params.apiSecretKey,
          ctx.params.userName
        );
        return twitter
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

export { Twitter };
