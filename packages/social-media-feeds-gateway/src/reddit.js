import { Reddit as RedditClient } from "@pojntfx-incubator/social-media-feeds-core";

const Reddit = {
  name: "reddit",
  actions: {
    get: {
      params: {
        userName: "string"
      },
      handler: async ctx => {
        const reddit = new RedditClient(ctx.params.userName);
        return reddit.getEvents();
      },
      cache: true
    }
  }
};

export { Reddit };
