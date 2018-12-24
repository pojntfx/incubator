import { GitHub as GitHubClient } from "@pojntfx-incubator/social-media-feeds-core";

const GitHub = {
  name: "github",
  actions: {
    get: {
      params: {
        userName: "string"
      },
      handler: async ctx => {
        const github = new GitHubClient(ctx.params.userName);
        return github.getEvents();
      },
      cache: true
    }
  }
};

export { GitHub };
