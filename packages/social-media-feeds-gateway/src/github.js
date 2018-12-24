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
        return github
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

export { GitHub };
